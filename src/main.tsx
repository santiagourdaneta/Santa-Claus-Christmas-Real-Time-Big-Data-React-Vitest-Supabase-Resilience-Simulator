import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react";
import App from './App.tsx'
import './index.css'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  // Define la versión del proyecto (Release)
  release: "navidad-2025@1.0.0",
  // Añade etiquetas personalizadas para filtrar rápido
  initialScope: {
    tags: { 
      "modelo.cientifico": "regresion-lineal",
      "entorno": "desarrollo-local"
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

 