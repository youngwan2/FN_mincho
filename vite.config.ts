/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  preview: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": getAliasPath("./src"),
      "@assets": getAliasPath("./src/assets"),
      "@components": getAliasPath("./src/components"),
      "@pages": getAliasPath("./src/pages"),
      "@store": getAliasPath("./src/store"),
      "@apis": getAliasPath("./src/apis"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  }

})

// alias path 를 만들어주는 콜백함수
function getAliasPath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
};
