// Renders LinkedIn banners (1584×396, plus 2× copies) in the portfolio's waterline style, with
// the site's own Schibsted Grotesk. Needs the site running (it borrows the loaded font).
// Usage: node scripts/make-linkedin-banner.mjs [baseUrl=http://localhost:3000] [outDir=.]
//
// No words: a paper field over a jade field and the RS monogram, split by the seam the same
// way as the site's hero and icon. LinkedIn lays the profile photo over the lower-left, so the
// monogram sits on the right.
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? ".";
const W = 1584;
const H = 396;
const PAPER = "#F2F4F3";
const JADE = "#0F5C4D";

// The letters are set twice, each copy clipped to one field, so they change colour at the seam.
const monogram = ({ size, right, top }) =>
  [
    ["0 0 50% 0", JADE],
    ["50% 0 0 0", PAPER],
  ]
    .map(
      ([clip, color]) => `
  <div style="position:absolute;inset:0;clip-path:inset(${clip})">
    <p style="position:absolute;right:${right}px;top:${top};margin:0;transform:translateY(-50%);color:${color};
      font-weight:900;font-size:${size}px;line-height:1;letter-spacing:-0.06em">RS</p>
  </div>`,
    )
    .join("");

const variants = {
  // A: the whole monogram on the right third, centred on the seam.
  a: monogram({ size: 300, right: 120, top: "50%" }),
  // B: the monogram at architectural size, cropped by the right edge and the top and bottom.
  b: monogram({ size: 620, right: -90, top: "54%" }),
};

const banner = (inner) => `
<div id="banner" style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${JADE};
  font-family:var(--font-schibsted),sans-serif;">
  <div style="position:absolute;inset:0 0 50% 0;background:${PAPER}"></div>
  ${inner}
</div>`;

const browser = await chromium.launch();
for (const [name, inner] of Object.entries(variants)) {
  for (const scale of [1, 2]) {
    const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate((markup) => {
      document.body.innerHTML = markup;
      document.body.style.cssText = "margin:0";
    }, banner(inner));
    const out = `${outDir}/linkedin-banner-${name}${scale === 2 ? "@2x" : ""}.png`;
    await page.locator("#banner").screenshot({ path: out });
    console.log("saved", out);
    await page.close();
  }
}
await browser.close();
