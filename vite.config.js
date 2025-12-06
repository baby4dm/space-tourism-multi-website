import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import htmlInject from "vite-plugin-html-inject";

export default defineConfig({
  base: "/space-tourism-multi-website/",

  plugins: [tailwindcss(), htmlInject()],
});
