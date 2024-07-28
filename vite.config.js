import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../StayFlex-backend/public',
    emptyOutDir: true,
    sourcemap: true, // Enable source maps for debugging
  },
})
