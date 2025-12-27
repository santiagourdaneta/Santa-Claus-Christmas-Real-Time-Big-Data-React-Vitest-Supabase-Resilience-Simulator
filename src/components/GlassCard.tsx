import { useState } from 'react';

export default function GlassCard({ onActivateMagic, magicActive }: any) {
  const [cooldown, setCooldown] = useState(0);

  const handleExecute = () => {
    if (cooldown > 0) return;
    
    // Simulación científica de velocidad
    const v = Number((Math.random() * 800 + 100).toFixed(2));
    onActivateMagic(v);

    // Iniciar Cooldown de 10 segundos
    setCooldown(100);
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 0) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 100);
  };

  return (
    <div className="glass-card main-ui">
      <h2 className="glow-text">Panel de Telemetría</h2>
      <p>Big Data Predictivo Navidad 2025</p>
      
      <button 
        className="btn-magic" 
        onClick={handleExecute} 
        disabled={cooldown > 0 || magicActive}
      >
        <div className="cooldown-bar" style={{ width: `${cooldown}%` }}></div>
        <span className="btn-text">
          {cooldown > 0 ? `RECARGANDO (${(cooldown/10).toFixed(0)}s)` : 'INICIAR VUELO'}
        </span>
      </button>
    </div>
  );
}