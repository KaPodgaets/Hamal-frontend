import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 👈 change to your desired port
    strictPort: true, // 👈 fail if the port is taken instead of falling back
    host: true, // 👈 optional: allows access from local network or Docker
  },
});
