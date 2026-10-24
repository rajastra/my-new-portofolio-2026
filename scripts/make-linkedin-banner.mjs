// Renders the LinkedIn banner (1584×396, plus a 2× copy) in the portfolio's waterline style,
// with the site's own Schibsted Grotesk. Needs the site running (it borrows the loaded font).
// Usage: node scripts/make-linkedin-banner.mjs [baseUrl=http://localhost:3000] [outDir=.]
//
// LinkedIn lays the profile photo over the lower-left of the banner, so everything that must
// be read sits on the right half or along the top edge.
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? ".";
const W = 1584;
const H = 396;
const PAPER = "#F2F4F3";
const JADE = "#0F5C4D";
const INK = "#16202B";

const html = `
<div id="banner" style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${JADE};
  font-family:var(--font-schibsted),sans-serif;">
  <div style="position:absolute;inset:0 0 50% 0;background:${PAPER}"></div>

  <!-- The two display lines meet the seam, right-aligned on a 64px margin. -->
  <p style="position:absolute;right:64px;bottom:50%;margin:0;color:${JADE};font-weight:900;font-size:136px;
    line-height:0.78;letter-spacing:-0.035em;text-transform:uppercase">Frontend</p>
  <p style="position:absolute;right:64px;top:50%;margin:0;padding-top:14px;color:${PAPER};font-weight:900;
    font-size:136px;line-height:0.78;letter-spacing:-0.035em;text-transform:uppercase">Engineer</p>

  <!-- Top-left, above where the profile photo lands. -->
  <p style="position:absolute;left:64px;top:40px;margin:0;max-width:430px;color:${INK};font-size:26px;
    line-height:1.25;font-weight:500">School ERP systems and booking platforms, built with React, Next.js and TypeScript.</p>

  <!-- Top-right, on the same top line as the sentence: where to find the work. -->
  <p style="position:absolute;right:64px;top:40px;margin:0;color:${JADE};font-size:26px;line-height:1.25;
    font-weight:600">www.rajasaputera.me</p>
</div>`;

const browser = await chromium.launch();
for (const scale of [1, 2]) {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate((markup) => {
    document.body.innerHTML = markup;
    document.body.style.cssText = "margin:0";
  }, html);
  const out = `${outDir}/linkedin-banner${scale === 2 ? "@2x" : ""}.png`;
  await page.locator("#banner").screenshot({ path: out });
  console.log("saved", out);
  await page.close();
}
await browser.close();
