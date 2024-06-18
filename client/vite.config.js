import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Determine the API URL based on the environment
const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://https://denvermha.netlify.app/.netlify/functions"
    : "http://localhost:5000/api";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiURL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
