import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const alltestsDir = path.resolve(__dirname, "../alltests");

function serveAlltests() {
  return {
    name: "serve-alltests",
    configureServer(server) {
      server.middlewares.use("/alltests", (req, res, next) => {
        const rel = (req.url ?? "/").split("?")[0];
        const filePath = path.join(alltestsDir, rel);
        if (!filePath.startsWith(alltestsDir) || !fs.existsSync(filePath)) {
          next();
          return;
        }
        res.setHeader("Content-Type", "application/json");
        fs.createReadStream(filePath).pipe(res);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use("/alltests", (req, res, next) => {
        const rel = (req.url ?? "/").split("?")[0];
        const filePath = path.join(alltestsDir, rel);
        if (!filePath.startsWith(alltestsDir) || !fs.existsSync(filePath)) {
          next();
          return;
        }
        res.setHeader("Content-Type", "application/json");
        fs.createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist/alltests");
      fs.mkdirSync(outDir, { recursive: true });
      for (const name of fs.readdirSync(alltestsDir)) {
        if (name.endsWith(".json")) {
          fs.copyFileSync(
            path.join(alltestsDir, name),
            path.join(outDir, name),
          );
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [serveAlltests()],
});
