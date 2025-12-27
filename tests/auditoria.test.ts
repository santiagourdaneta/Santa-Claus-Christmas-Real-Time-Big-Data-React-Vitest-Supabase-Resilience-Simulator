import { expect, test, describe } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

describe('Pruebas de Resiliencia y Auditoría', () => {
  test('Debe registrar un bloqueo en logs_auditoria tras exceso de peticiones', async () => {
    // 1. Obtener conteo inicial
    const { count: initialCount } = await supabase
      .from('logs_auditoria')
      .select('*', { count: 'exact', head: true });
    
    const startCount = initialCount || 0;

    // 2. Intentar inundar la base de datos
    // Envolvemos en try/catch porque SABEMOS que el trigger lanzará un error
    try {
      for (let i = 0; i < 7; i++) {
        await supabase.from('simulaciones').insert([{ velocidad: 500 + i }]);
      }
    } catch (e) {
      console.log("🛡️ El Trigger bloqueó el ataque correctamente (P0001 capturado)");
    }

    // 3. Esperar a que el insert del log se asiente
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 4. Obtener conteo final
    const { count: finalCount } = await supabase
      .from('logs_auditoria')
      .select('*', { count: 'exact', head: true });

    const endCount = finalCount || 0;

    console.log(`📊 Análisis: Inicio[${startCount}] - Fin[${endCount}]`);
    
    // El test pasa si el conteo final es mayor al inicial
    expect(endCount).toBeGreaterThan(startCount);
  }, 15000);
});