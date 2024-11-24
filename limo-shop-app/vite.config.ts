import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/common/components"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  plugins: [react(), tsconfigPaths()],
});
