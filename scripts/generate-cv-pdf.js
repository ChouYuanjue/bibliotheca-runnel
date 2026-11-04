// The public CV PDF is typeset with the native Tsinghua XeLaTeX resume template.
// The website Markdown (data/cv.md) is a readable web counterpart, not the PDF source.
// This script deliberately does not use md-to-pdf: doing so would overwrite the curated CV.
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "cv-source");
const texFile = path.join(sourceDir, "main.tex");
const publicPdf = path.join(root, "public", "cv.pdf");

function findXeLaTeX() {
  if (process.env.XELATEX_BIN) return process.env.XELATEX_BIN;
  if (process.platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA;
    if (localAppData) {
      const candidate = path.join(localAppData, "Programs", "MiKTeX", "miktex", "bin", "x64", "xelatex.exe");
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return "xelatex";
}

function compile() {
  if (!fs.existsSync(texFile)) throw new Error("Missing cv-source/main.tex");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "bibliotheca-cv-"));
  const compiler = findXeLaTeX();
  try {
    for (let i = 0; i < 2; i++) {
      const args = [
        "-interaction=nonstopmode",
        "-halt-on-error",
        "-no-shell-escape",
        `-output-directory=${tmp}`,
        "main.tex",
      ];
      const result = spawnSync(compiler, args, {
        cwd: sourceDir,
        encoding: "utf8",
        shell: false,
        maxBuffer: 8 * 1024 * 1024,
      });
      if (result.error || result.status !== 0) {
        throw new Error(
          `XeLaTeX pass ${i + 1} failed. ${result.error?.message || ""}\n` +
          (result.stdout || "").slice(-1800) + "\n" + (result.stderr || "").slice(-500)
        );
      }
    }
    const builtPdf = path.join(tmp, "main.pdf");
    if (!fs.existsSync(builtPdf) || fs.statSync(builtPdf).size < 10000) {
      throw new Error("XeLaTeX did not produce a valid CV PDF");
    }
    fs.copyFileSync(builtPdf, publicPdf);
    console.log(`Updated ${publicPdf} from cv-source/main.tex (${fs.statSync(publicPdf).size} bytes).`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

try {
  compile();
} catch (err) {
  console.error(err.message);
  console.error("Install XeLaTeX or set XELATEX_BIN. The checked-in public/cv.pdf remains untouched on failure.");
  process.exitCode = 1;
}
