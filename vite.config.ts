import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  

 const basePath = process.env.VITE_FRONTEND_SUBPATH; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath
})
