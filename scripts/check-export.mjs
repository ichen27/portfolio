import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
function files(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
const htmlFiles = files(root).filter(p => p.endsWith(".html"));
assert.equal(htmlFiles.filter(p => path.relative(root, p).startsWith(`work${path.sep}`)).length, 10, "All ten case studies must export");
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
assert(home.includes("Ivan Chen") && home.includes("Research &amp; experiments"));
assert(!home.includes("Available for Summer 2026"), "Stale availability must be removed");
assert.equal(fs.readFileSync("public/artifacts/chess-training.csv","utf8").trim().split("\n").length,62);
assert(fs.statSync("public/resume.pdf").size > 10000);
console.log(`Export verified: ${htmlFiles.length} pages, ${localLinks} local links/assets, 10 case studies, training data and resume.`);

const researchSlugs = ["decision-models", "cad-kernel", "spatial-capture", "vision-training"];
for (const slug of researchSlugs) {
  const html = fs.readFileSync(path.join(root, "work", slug, "index.html"), "utf8");
  assert(html.includes("<figure") && html.includes("<table") && html.includes("Download the recorded data"), `Research evidence missing: ${slug}`);
}
assert(!home.includes("Agent Queue") && !home.includes("agent-queue.png"));
assert(!fs.readFileSync(path.join(root, "work/agent-harnesses/index.html"), "utf8").includes("Agent Queue"));
assert(!fs.existsSync("public/artifacts/agent-queue.png"));
assert(!fs.existsSync(path.join(root, "artifacts/agent-queue.png")));
const trial = JSON.parse(fs.readFileSync("public/artifacts/agent-trial.json", "utf8"));
const advice = trial.arms.assisted.timeline;
assert.equal(advice.length, 40);
assert.equal(advice.filter(t => !t.advice_correct).length, 5);
assert(advice.find(t => t.event_id === "E17").advice_correct, "Score advice against acceptable actions, including the recovery event");
for (const arm of Object.values(trial.arms)) {
  assert.equal(arm.timeline.filter(t => t.correct).length, arm.counters.correct_actions);
}
const geometry = JSON.parse(fs.readFileSync("public/artifacts/geometry-validation.json", "utf8"));
assert.equal(geometry.rows.length, geometry.comparisons);
assert(geometry.rows.every(row => row.passed));
const splat = JSON.parse(fs.readFileSync("public/artifacts/splat-training.json", "utf8"));
assert.equal(splat.cleanup.input_splats - splat.cleanup.removed, splat.splats);
assert.equal(splat.metrics.at(-1).steps, splat.training_steps);
assert.equal(splat.heldout_views, 12);
console.log("Research evidence verified: four illustrated studies, recorded results, correct action scoring, no Agent Queue association.");
