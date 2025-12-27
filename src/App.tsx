import { useState, useEffect } from 'react'; 
import { createClient } from '@supabase/supabase-js';
import * as Sentry from "@sentry/react";
import { Analytics } from '@vercel/analytics/react';
import Santa from './components/Santa';
import GlassCard from './components/GlassCard';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [magicActive, setMagicActive] = useState(false);
  const [totalMagia, setTotalMagia] = useState(0);
  const [simulaciones, setSimulaciones] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const [bloqueos, setBloqueos] = useState(0);
  
  // --- Hook para estado Offline ---
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  // 1. Datos iniciales y Realtime de Simulaciones
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const { data, count, error } = await supabase
          .from('simulaciones')
          .select('*', { count: 'exact' })
          .order('creado_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        if (data) setSimulaciones(data);
        if (count !== null) setTotalMagia(count);
      } catch (err: any) {
        Sentry.captureException(err);
        setErrorLog("Error al conectar con la Red de Santa");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    const channel = supabase
      .channel('cambios-navidenos')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'simulaciones' }, 
        (payload) => {
          setSimulaciones(prev => [payload.new, ...prev].slice(0, 5));
          setTotalMagia(prev => prev + 1);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // 2. Auditoría de Bloqueos
  useEffect(() => {
    const el = document.getElementById('shield-counter');
    if (el) {
      el.classList.add('shield-pulse');
      setTimeout(() => el.classList.remove('shield-pulse'), 600);
    }

    const fetchAuditoria = async () => {
      const { count } = await supabase
        .from('logs_auditoria')
        .select('*', { count: 'exact', head: true });
      if (count !== null) setBloqueos(count);
    };
    
    fetchAuditoria();
    
    const auditChannel = supabase.channel('audit-logs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'logs_auditoria' }, 
      () => setBloqueos(prev => prev + 1))
      .subscribe();

    return () => { supabase.removeChannel(auditChannel); };
  }, [bloqueos]); 

  const handleMagic = async (velocidad: number) => {
    if (isOffline) {
      setErrorLog("⚠️ Estás offline. No puedes enviar magia.");
      return;
    }

    setMagicActive(true);
    setErrorLog(null);

    const { error } = await supabase
      .from('simulaciones')
      .insert([{ velocidad, creado_at: new Date().toISOString() }]);

    if (error) {
      const msg = error.message.includes('Límite') 
        ? "⚠️ ¡Demasiada magia! Rate limit activado." 
        : "Error en la transmisión.";
      setErrorLog(msg);
      Sentry.captureException(error);
    }

    setTimeout(() => setMagicActive(false), 8000);
  };

  return (
    <div className="main-wrapper">
      <div className="stats-panel glass-card">
        <span className="glow-text">Impacto Global: {totalMagia.toLocaleString()} Almas</span>
        <p id="shield-counter" className="shield-text">
          🛡️ Ataques repelidos: {bloqueos.toLocaleString()}
        </p>
        {errorLog && <div className="error-badge">{errorLog}</div>}
      </div>

      <Santa visible={magicActive} />
      <GlassCard onActivateMagic={handleMagic} magicActive={magicActive} />

      <div className="tabla-container glass-card">
        <h3 className="christmas-title">Últimos Vuelos Detectados</h3>
        <div className="tabla-content">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-row" style={{ width: `${90 - (i * 5)}%` }}></div>
            ))
          ) : (
            simulaciones.map(s => (
              <div key={s.id} className="data-row fade-in">
                <span className="velocidad-tag">{s.velocidad} km/h</span>
                <span className="hora-tag">{new Date(s.creado_at).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Indicador de Status Offline/Online */}
      <div className="status-indicator">
        {isOffline ? (
          <div className="status-pill offline">
            <span className="dot pulse-red"></span> MODO OFFLINE
          </div>
        ) : (
          <div className="status-pill online">
            <span className="dot green"></span> SISTEMAS NOMINALES
          </div>
        )}
      </div>

      <Analytics />
    </div>
  );
}