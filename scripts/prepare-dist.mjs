import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const publicDir = resolve(projectRoot, "public");
const distDir = resolve(projectRoot, "dist");

if (!existsSync(resolve(publicDir, "index.html"))) {
  throw new Error("public/index.html is required to package the Site");
}

rmSync(distDir, { recursive: true, force: true });
cpSync(publicDir, distDir, { recursive: true });

console.log("Packaged public/ as dist/ for ChatGPT Sites.");
