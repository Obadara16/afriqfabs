import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

dotenv.config(); // load environment variables from .env file

export default defineConfig({
  server: {
    // proxy: {
    //   "/api/v1": "https://afrimart-backend.onrender.com/",
    // },
    proxy: {
      "/api/v1": "http://localhost:5000/",
    },
  },
  plugins: [
    react(),
    replace({
      "process.env.REACT_APP_STRIPE_SECRET_KEY": JSON.stringify(
        process.env.REACT_APP_STRIPE_SECRET_KEY
      ),
      "process.env.MY_VARIABLE": JSON.stringify(process.env.MY_VARIABLE),
      preventAssignment: true,
    }),
  ],
  esbuild: {
    // this will allow dynamic require statements in faker to work correctly
    // remove this if you are not using faker or similar libraries
  },
});
