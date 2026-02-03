import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * Rewrite bare directory paths to their index.html so they are served
 * as static files before Vite's SPA history-fallback kicks in.
 */
function serveStaticPages(): Plugin {
  return {
    name: "serve-static-pages",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /^\/politica-de-privacidad\/?(\?.*)?$/.test(req.url)) {
          req.url = "/politica-de-privacidad/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [serveStaticPages(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
