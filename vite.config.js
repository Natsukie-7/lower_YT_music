import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import laravel from "laravel-vite-plugin";
import solid from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/scss/index.scss", "resources/ts/main.ts"],
      refresh: true,
    }),
    solid(),
    checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/solid"),
    },
  },
  server: {
    watch: {
      ignored: ["**/storage/framework/views/**"],
    },
  },
});
