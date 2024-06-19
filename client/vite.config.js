import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use the deployed backend URL in production
const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://mongo-vite-app-1.onrender.com"
    : "http://localhost:5000";

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
