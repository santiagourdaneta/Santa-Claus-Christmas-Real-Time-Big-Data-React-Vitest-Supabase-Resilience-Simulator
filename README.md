# 🎅 Proyecto Santa Big Data Simulator - Resiliencia Global

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

Este es un simulador de misión crítica diseñado para manejar una carga teórica de muchisimas peticiones simultáneas. Utiliza una arquitectura moderna basada en **Vite + React** y **Supabase** para el motor de datos en tiempo real.

## 🚀 Arquitectura de Alta Disponibilidad(Stack Tecnológico)

- **Frontend:** React 18+ con Vite para carga ultra-rápida (HMR) y (SPA) desplegado en Vercel con espejo en Netlify.
- **Base de Datos:** PostgreSQL gestionado por **Supabase** con funciones en tiempo real.
- **Resiliencia:** Row Level Security (RLS) y SQL Triggers para **Rate Limiting**. Modo Offline con sincronización automática vía LocalStorage.
- **Monitoreo:** Integración completa con Sentry para reporte de errores.
* **Testing:** Unit & Integration testing con **Vitest** (Enfoque en física y auditoría).
* **DevOps:** Husky (Git Hooks), Secretlint (Seguridad), y CI/CD automatizado.

## 🛡️ Medidas de Seguridad

- **RLS (Row Level Security):** Protección a nivel de base de datos.
- **Auditoría:** Registro automático de intentos de ataque por denegación de servicio (DDoS).
- **Cooldown:** Algoritmo de enfriamiento en cliente para evitar saturación de API.


## 🛡️ Características Avanzadas
1. **Resiliencia Offline:** Sincronización automática vía LocalStorage.
2. **Sistema de Auditoría:** Logs persistentes de intentos de intrusión (Anti-DDoS logic).
3. **Escalabilidad:** Diseñado para despliegue en Vercel/Netlify con redundancia.

## 🛠️ Instalación

1. Clonar el repositorio.
2. `npm install`
3. Configurar variables de entorno `.env` con las claves de Supabase.
4. `npm run dev`

## 📊 Página de Status

Acceso al monitoreo en tiempo real: [Link a tu Status Page]


