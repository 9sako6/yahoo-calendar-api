import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/server.ts"),
      name: "yahoo-calendar-api",
      fileName: (format) => `index.${format}.js`,
    },
  },
});
