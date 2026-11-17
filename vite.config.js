/// <reference types="vitest" />

import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "build",
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      treeshake: true,
      tsconfig: true,
      output: {
        cleanDir: true,
        format: "esm",
        minify: true,
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  define: {
    global: "globalThis",
  },
  plugins: [react({ devTarget: "es2022" }), svgrPlugin()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    port: 3000,
    proxy: {
      "/rest": {
        target: "https://clubapi-test.handball.ch/rest",
        changeOrigin: true,
        auth: process.env.VITE_API_AUTH_TOKEN,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
