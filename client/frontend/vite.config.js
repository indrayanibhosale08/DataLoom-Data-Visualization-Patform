import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

// client/vite.config.js

// import path from "path" // <-- ADD THIS IMPORT
// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // <-- ADD THIS ALIAS CONFIG
//     },
//   },
// })