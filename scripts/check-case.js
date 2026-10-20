const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      results.push(file);
    }
  });
  return results;
}

const files = walk("./src");
let errors = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  const regex = /from\s+["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let importPath = match[1];
    if (importPath.startsWith("@/")) {
      const rel = importPath.slice(2);
      const fullPathBase = path.join("./src", rel);
      checkPathExact(fullPathBase, file, importPath);
    } else if (importPath.startsWith("./") || importPath.startsWith("../")) {
      const fullPathBase = path.resolve(path.dirname(file), importPath);
      checkPathExact(fullPathBase, file, importPath);
    }
  }
});

function checkPathExact(target, sourceFile, importStr) {
  const candidates = [
    target,
    target + ".ts",
    target + ".tsx",
    target + ".js",
    target + ".jsx",
    path.join(target, "index.ts"),
    path.join(target, "index.tsx")
  ];
  let found = candidates.find(c => fs.existsSync(c));
  if (found) {
    const normalized = path.resolve(found);
    let current = path.parse(normalized).root;
    const parts = normalized.slice(current.length).split(path.sep);
    for (const part of parts) {
      const entries = fs.readdirSync(current);
      if (!entries.includes(part)) {
        console.error(`CASE MISMATCH in ${sourceFile} importing "${importStr}": on disk is [${entries.find(e => e.toLowerCase() === part.toLowerCase())}] but requested [${part}]`);
        errors++;
      }
      current = path.join(current, part);
    }
  } else {
    if (importStr.startsWith(".") || importStr.startsWith("@/")) {
      console.warn(`FILE NOT FOUND: "${importStr}" referenced in ${sourceFile}`);
      errors++;
    }
  }
}

console.log(`Auditoría de Mayúsculas/Minúsculas terminada. Errores detectados: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
