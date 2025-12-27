import { describe, it, expect } from 'vitest';

// 1. La función matemática que queremos probar (Cálculo Numérico)
export const calcularVelocidadSanta = (regalos: number, climaFactor: number) => {
  const masaTotal = 500 + (regalos * 0.5); // masa base + peso regalos
  const gravedad = 9.81;
  const densidadAire = 1.225 * climaFactor;
  const areaSustentacion = 0.5;
  const coeficienteArrastre = 0.4;

  // Fórmula de optimización
  return Math.sqrt((2 * masaTotal * gravedad) / (densidadAire * areaSustentacion * coeficienteArrastre));
};

// 2. El Test Suite
describe('Simulación Matemática de Vuelo', () => {
  
  it('Debe calcular la velocidad correcta para 100 regalos', () => {
      const resultado = calcularVelocidadSanta(100, 1);
      expect(resultado).toBeGreaterThan(0);
      expect(resultado).toBeCloseTo(209.87, 1); 
    });

  it('Debe aumentar la velocidad si hay más carga (regalos)', () => {
    const velLigero = calcularVelocidadSanta(10, 1);
    const velPesado = calcularVelocidadSanta(1000, 1);
    expect(velPesado).toBeGreaterThan(velLigero);
  });

  it('Debe manejar factores climáticos extremos (DDA)', () => {
    const velNormal = calcularVelocidadSanta(100, 1);
    const velTormenta = calcularVelocidadSanta(100, 1.5); // Aire más denso
    expect(velTormenta).toBeLessThan(velNormal);
  });
});