// Renders the "RS" waterline monogram with the site's own Schibsted Grotesk and saves the app
// icons. Needs the site running (it borrows the loaded font).
// Usage: node scripts/make-icons.mjs [baseUrl=http://localhost:3000]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const PAPER = "#F2F4F3";
const JADE = "#0F5C4D";

// Two copies of the letters, each clipped to one half, so the colour flips at the seam.
// At favicon sizes the split is unreadable, so those use `small`: plain paper on jade.
const mark = (size) => `
  <div id="mark" style="position:relative;width:${size}px;height:${size}px;overflow:hidden;background:${JADE}">
    <div style="position:absolute;inset:0 0 50% 0;background:${PAPER}"></div>
    ${[
      ["0 0 50% 0", JADE],
      ["50% 0 0 0", PAPER],
    ]
      .map(
        ([clip, color]) => `
      <div style="position:absolute;inset:0;clip-path:inset(${clip});display:flex;align-items:center;justify-content:center;
        font-family:var(--font-schibsted),sans-serif;font-weight:900;letter-spacing:-0.06em;
        font-size:${size * 0.62}px;line-height:1;color:${color};padding-right:${size * 0.03}px">RS</div>`,
      )
      .join("")}
  </div>`;

const small = (size) => `
  <div id="mark" style="width:${size}px;height:${size}px;background:${JADE};display:flex;align-items:center;justify-content:center;
    font-family:var(--font-schibsted),sans-serif;font-weight:900;letter-spacing:-0.04em;font-size:${size * 0.6}px;line-height:1;color:${PAPER}">RS</div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

mkdirSync("src/app", { recursive: true });
// The plain mark is rendered large; scripts/make-favicon.py downsamples it into favicon.ico.
const shots = [
  ["src/app/icon.png", 512, mark],
  ["src/app/apple-icon.png", 180, mark],
  [".icon-small.png", 192, small],
];
for (const [out, size, draw] of shots) {
  await page.evaluate((html) => {
    document.body.innerHTML = html;
    document.body.style.cssText = "margin:0;background:transparent";
  }, draw(size));
  await page.locator("#mark").screenshot({ path: out });
  console.log("saved", out);
}
await browser.close();
