import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "src/server.ts",
      tsCompiler: "esbuild",
      exportName: "viteNodeApp",
    }),
  ],
  resolve: {
    alias: {
      "~/": `${__dirname}/src/`,
    },
  },
});
