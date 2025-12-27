import { test, expect } from '@playwright/test';

test('Debe gestionar correctamente el ciclo de vida del cálculo', async ({ page }) => {
  // Navegar y esperar a que no haya actividad de red (asegura que cargó todo)
  await page.goto('/', { waitUntil: 'networkidle' });

  // Buscar el botón ignorando mayúsculas/minúsculas
  const boton = page.getByRole('button', { name: /ejecutar simulación/i });
  
  // Si esto falla aquí, verás el error real en la captura de pantalla
  await expect(boton).toBeVisible({ timeout: 15000 });
  await boton.click();
  
  await expect(page.getByText(/procesando/i)).toBeVisible()
  
  // Verificación final tras el cálculo (1.5s)
  // Buscamos el texto que aparece en el resultado
  await expect(page.getByText('Velocidad de Crucero')).toBeVisible({ timeout: 10000 });
});