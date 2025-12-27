import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100, // 100 usuarios simultáneos
  duration: '30s',
};

export default function () {
  http.get('https://mi-proyecto-glass.vercel.app');
  sleep(1);
}