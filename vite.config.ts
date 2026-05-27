/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],



  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },


})




// https://vitejs.dev
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     allowedHosts: [
//       'simmering-shabby-overtake.ngrok-free.dev', // Allows your specific ngrok tunnel
//       '.ngrok-free.dev'                           // Optional: Allows ANY ngrok-free tunnel you generate
//     ]
//   }
// });
