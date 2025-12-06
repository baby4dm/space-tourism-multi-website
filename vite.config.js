import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/space-tourism-multi-website/",

  plugins: [tailwindcss()],

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
