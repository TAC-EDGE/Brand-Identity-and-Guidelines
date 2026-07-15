import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "node:path";
import { existsSync, cpSync, createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

/**
 * Serves the repository's asset library, tokens and exports at
 * /assets, /tokens and /exports in dev, and copies them into dist/
 * on build, so download links work identically in both.
 */
function repoStatics(): Plugin {
  const dirs = ["assets", "tokens", "exports", "docs", "templates"];
  return {
    name: "tacedge-repo-statics",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0];
        const dir = dirs.find((d) => url.startsWith(`/${d}/`));
        if (!dir) return next();
        const file = resolve(root, decodeURIComponent(url.slice(1)));
        if (!file.startsWith(resolve(root, dir)) || !existsSync(file)) return next();
        res.setHeader("Access-Control-Allow-Origin", "*");
        const types: Record<string, string> = {
          svg: "image/svg+xml", png: "image/png", webp: "image/webp",
          jpeg: "image/jpeg", jpg: "image/jpeg", pdf: "application/pdf",
          json: "application/json", css: "text/css", ts: "text/plain",
          md: "text/markdown", html: "text/html",
        };
        const ext = file.split(".").pop() ?? "";
        res.setHeader("Content-Type", types[ext] ?? "application/octet-stream");
        createReadStream(file).pipe(res);
      });
    },
    closeBundle() {
      for (const d of dirs) {
        const from = resolve(root, d);
        if (existsSync(from)) cpSync(from, resolve(root, "dist", d), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), repoStatics()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        print: resolve(root, "print.html"),
        "style-tile": resolve(root, "style-tile.html"),
      },
    },
  },
});
