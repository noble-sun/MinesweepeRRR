import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

process.env.ROLLUP_USE_NODE_BUILTIN = 'true';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
