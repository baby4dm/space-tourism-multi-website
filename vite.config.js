import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import htmlInject from "vite-plugin-html-inject";

export default defineConfig({
  base: "/space-tourism-multi-website/",

  plugins: [
    tailwindcss(),
    htmlInject({
      injectData: {
        header: "/src/components/Header.html",
      },
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        destination: "destination.html",
        crew: "crew.html",
        technology: "technology.html",
      },
    },
  },
});
