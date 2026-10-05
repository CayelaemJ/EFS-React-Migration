import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: { outDir: "dist/client", emptyOutDir: false },
  server: { port: 5173, proxy: { "/api": "http://localhost:3000", "/static": "http://localhost:3000" } },
});
