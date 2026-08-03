import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const distDir = resolve(projectRoot, "dist");
const workerEntry = resolve(distDir, "server", "index.js");
const hostingSource = resolve(projectRoot, ".openai", "hosting.json");
const hostingDir = resolve(distDir, ".openai");
const hostingTarget = resolve(hostingDir, "hosting.json");

if (!existsSync(workerEntry)) {
  throw new Error("dist/server/index.js is required to package the Site");
}

if (!existsSync(hostingSource)) {
  throw new Error(".openai/hosting.json is required to package the Site");
}

mkdirSync(hostingDir, { recursive: true });
copyFileSync(hostingSource, hostingTarget);

console.log("Packaged the Vinext worker and hosting manifest for ChatGPT Sites.");
