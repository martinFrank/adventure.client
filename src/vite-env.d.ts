/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_FRONTEND_SUBPATH: string
  readonly VITE_BACKEND_API_URL: string
  // Hier können weitere Umgebungsvariablen ergänzt werden
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}