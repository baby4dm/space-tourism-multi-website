import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import htmlInject from "vite-plugin-html-inject";

export default defineConfig({
  base: "/space-tourism-multi-website/",

  // Головна папка тепер src/pages.
  // Vite навіть не подивиться на твій index.html з редіректом у корені проекту.
  root: resolve(__dirname, "src/pages"),

  publicDir: resolve(__dirname, "public"),

  plugins: [tailwindcss(), htmlInject()],

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        // Абсолютні шляхи - це найнадійніший варіант
        main: resolve(__dirname, "src/pages/index.html"),
        crew: resolve(__dirname, "src/pages/crew.html"),
        destination: resolve(__dirname, "src/pages/destination.html"),
        technology: resolve(__dirname, "src/pages/technology.html"),
      },
    },
  },
});
