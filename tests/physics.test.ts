import { expect, test } from 'vitest';

test('La velocidad debe tener exactamente 2 decimales', () => {
  const velocidad = 250.55; 
  const decimales = velocidad.toString().split('.')[1]?.length || 0;
  expect(decimales).toBe(2);
});