import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
function files(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
const htmlFiles = files(root).filter(p => p.endsWith(".html"));
assert.equal(htmlFiles.filter(p => p.includes("/work/")).length, 10, "All ten case studies must export");
let localLinks = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file,"utf8");
  for (const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const url = new URL(raw.replaceAll("&amp;","&"), "https://ivanzhchen.com");
    const target = path.join(root, decodeURIComponent(url.pathname));
    const resolved = fs.existsSync(target) && fs.statSync(target).isFile() ? target : path.join(target,"index.html");
    assert(fs.existsSync(resolved), `Broken local link in ${file}: ${raw}`);
    if (url.hash && resolved.endsWith(".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(fs.readFileSync(resolved,"utf8").includes(`id="${id}"`), `Missing anchor ${raw}`);
    }
    localLinks++;
  }
}
const home=fs.readFileSync(path.join(root,"index.html"),"utf8");
assert(home.includes("Ivan Chen") && home.includes("Selected work"));
assert(!home.includes("Available for Summer 2026"), "Stale availability must be removed");
assert.equal(fs.readFileSync("public/artifacts/chess-training.csv","utf8").trim().split("\n").length,62);
assert(fs.statSync("public/resume.pdf").size > 10000);
console.log(`Export verified: ${htmlFiles.length} pages, ${localLinks} local links/assets, 10 case studies, training data and resume.`);
