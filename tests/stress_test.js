import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100, 
  duration: '30s',
};

// k6 usa __ENV para acceder a las variables de entorno
const SUPABASE_URL = __ENV.VITE_SUPABASE_URL;
const SUPABASE_KEY = __ENV.VITE_SUPABASE_ANON_KEY;

export default function () {
  const url = `${SUPABASE_URL}/rest/v1/simulaciones`;
  const params = {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  const payload = JSON.stringify({ velocidad: Math.random() * 1000 });

  http.post(url, payload, params);
  sleep(0.1); 
}