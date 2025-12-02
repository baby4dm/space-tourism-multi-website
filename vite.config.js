import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/pages/index.html"),
        crew: resolve(__dirname, "src/pages/crew.html"),
        destination: resolve(__dirname, "src/pages/destination.html"),
        technology: resolve(__dirname, "src/pages/technology.html"),
      },
    },
  },
});
