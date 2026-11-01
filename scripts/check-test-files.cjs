const fs = require('node:fs');
const path = require('node:path');

function list(dir, suffix) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...list(full, suffix));
    } else if (entry.name.endsWith(suffix)) {
      found.push(full);
    }
  }
  return found;
}

const sources = list('src', '.ts');
if (sources.length === 0) {
  process.exit(0);
}

const missing = [];
if (list('tests/unit', '.test.ts').length === 0) {
  missing.push('tests/unit/**/*.test.ts');
}
if (list('tests/integration', '.spec.ts').length === 0) {
  missing.push('tests/integration/**/*.spec.ts');
}
if (missing.length > 0) {
  console.error(`ソースがあるので、次のテストが必要です: ${missing.join(', ')}`);
  process.exit(1);
}
