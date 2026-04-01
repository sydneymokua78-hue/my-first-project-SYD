/**
 * Usage: node materialize-transcript.js <inbox.txt> <out.md>
 * Inbox format: lines like "     1|content" (Cursor read_file output).
 */
const fs = require("fs");
const path = require("path");

const inbox = process.argv[2];
const out = process.argv[3];
if (!inbox || !out) {
  console.error("Usage: node materialize-transcript.js <inbox.txt> <out.md>");
  process.exit(1);
}

const raw = fs.readFileSync(inbox, "utf8");
const cleaned = raw
  .split(/\r?\n/)
  .map((line) => {
    const m = line.match(/^\s*\d+\|(.*)$/);
    return m ? m[1] : line;
  })
  .join("\n");

fs.writeFileSync(out, cleaned, "utf8");
console.log("Wrote", path.resolve(out), "(" + Buffer.byteLength(cleaned, "utf8") + " bytes)");
