import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/google-trends": {
        target: "https://trends.google.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/google-trends/, ""),
      },
    },
  },
});