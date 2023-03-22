import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": "http://localhost:5000/",
    },
  },
  plugins: [react()],
  esbuild: {
    // this will allow dynamic require statements in faker to work correctly
    // remove this if you are not using faker or similar libraries
    jsxInject: `import React from 'react'`,
  },
});
