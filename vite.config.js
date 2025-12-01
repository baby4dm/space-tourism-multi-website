import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/space-tourism-multi-website/",

  plugins: [tailwindcss()],
});
