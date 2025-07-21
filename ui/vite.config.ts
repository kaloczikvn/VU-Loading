import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vext from "vite-plugin-vext";

export default defineConfig({
  plugins: [vext.default(), react()],
  build: {
    target: "es2015",
    cssCodeSplit: false,
  },
});
