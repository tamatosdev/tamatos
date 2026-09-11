const fs = require("fs");
const path = require("path");

const RATIO = 1280 / 1440;
const ROOT = path.join("D:/tamatos-new/src");
const EXT = new Set([".tsx", ".ts", ".css", ".jsx", ".js"]);

function scalePx(n) {
  if (n <= 16) return n;
  const scaled = Math.max(16, n * RATIO);
  return Math.round(scaled * 100) / 100;
}

function formatPx(n) {
  if (Number.isInteger(n)) return String(n);
  return String(n)
    .replace(/(\.\d*?[1-9])0+$/, "$1")
    .replace(/\.0+$/, "");
}

function transformClamp(content) {
  return content.replace(/clamp\(([^)]*)\)/g, (_full, inner) => {
    const parts = inner.split(",").map((p) => p.trim());
    const scaled = parts.map((part) => {
      const m = part.match(/^(-?[\d.]+)px$/);
      if (!m) return part;
      return formatPx(scalePx(parseFloat(m[1]))) + "px";
    });
    return "clamp(" + scaled.join(", ") + ")";
  });
}

function transformFile(content) {
  let out = content;
  let changes = 0;

  // fontSize: "..." / '...'
  out = out.replace(/(fontSize\s*:\s*)(["'])([^"']*)\2/g, (full, prefix, quote, value) => {
    let v = value;
    const before = v;
    if (v.includes("clamp(")) {
      v = transformClamp(v);
    } else {
      const m = v.match(/^([\d.]+)px$/);
      if (m) v = formatPx(scalePx(parseFloat(m[1]))) + "px";
    }
    if (v !== before) changes++;
    return prefix + quote + v + quote;
  });

  // font-size: ...
  out = out.replace(/(font-size\s*:\s*)([^;\n}]+)/g, (full, prefix, value) => {
    let v = value.trim();
    const before = v;
    if (v.includes("clamp(")) {
      v = transformClamp(v);
    } else {
      v = v.replace(/^([\d.]+)px/, (_, num) => formatPx(scalePx(parseFloat(num))) + "px");
    }
    if (v !== before) changes++;
    return prefix + v;
  });

  // text-[NNpx] and lg:text-[NNpx], also clamp
  out = out.replace(/((?:sm|md|lg|xl|2xl):)?text-\[([^\]]+)\]/g, (full, variant, inner) => {
    const prefix = variant || "";
    let v = inner;
    const before = v;
    if (v.includes("clamp(")) {
      v = transformClamp(v);
    } else if (/^[\d.]+px$/.test(v)) {
      v = formatPx(scalePx(parseFloat(v))) + "px";
    }
    if (v !== before) changes++;
    return prefix + "text-[" + v + "]";
  });

  return { out, changes };
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const files = walk(ROOT);
let totalFiles = 0;
let totalChanges = 0;
const samples = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const { out, changes } = transformFile(content);
  if (out !== content) {
    fs.writeFileSync(file, out, "utf8");
    totalFiles++;
    totalChanges += changes;
    samples.push(path.relative(ROOT, file) + " (" + changes + ")");
  }
}

console.log(
  JSON.stringify(
    {
      totalFiles,
      totalChanges,
      ratio: RATIO,
      example96: scalePx(96),
      example18: scalePx(18),
      example16: scalePx(16),
      example14: scalePx(14),
      samples,
    },
    null,
    2
  )
);
