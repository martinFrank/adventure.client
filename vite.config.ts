import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  

const basePath = import.meta.env.VITE_FRONTEND_SUBPATH; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/adventure-game',
  base: basePath
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import fs from 'fs';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync('./certs/key.pem'),
//       cert: fs.readFileSync('./certs/cert.pem'),
//     },
//     port: 3000,
//   },
// });
