// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://vistaandvoid.com",
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["www-dev.vantagepointastro.com", "localhost"],
    },
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false, // Allow large high-res photos from Lightroom
      },
    },
  },
});
