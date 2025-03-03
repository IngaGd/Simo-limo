import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/common/components"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BASE_URL,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
