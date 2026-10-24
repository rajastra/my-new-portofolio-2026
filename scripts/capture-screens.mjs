// Captures portfolio screenshots of local apps with Playwright.
// Usage: node scripts/capture-screens.mjs <config.json>
// Config: [{ url, out, width, height, scale?, fullPage?, waitFor?, hide?: string[], mask?: string[],
//            delay?, storageState? (from scripts/login-session.mjs) }]
// `hide` selectors are removed visually (devtools, cookie bars); `mask` selectors get their text
// replaced with neutral placeholders so no personal data ends up in a screenshot.
import { chromium } from "@playwright/test";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const shots = JSON.parse(readFileSync(process.argv[2], "utf8"));
const browser = await chromium.launch();

for (const s of shots) {
  const context = await browser.newContext({
    storageState: s.storageState,
    colorScheme: s.colorScheme ?? "light",
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: s.scale ?? 2,
    isMobile: s.width < 600,
    hasTouch: s.width < 600,
  });
  const page = await context.newPage();
  await page.goto(s.url, { waitUntil: "networkidle" });
  if (s.waitFor) await page.waitForSelector(s.waitFor, { timeout: 15_000 });
  if (s.hide?.length) {
    await page.addStyleTag({ content: `${s.hide.join(",")}{display:none!important}` });
  }
  if (s.mask?.length) {
    await page.evaluate((sels) => {
      for (const sel of sels) document.querySelectorAll(sel).forEach((el) => (el.textContent = "•••••"));
    }, s.mask);
  }
  if (s.fullPage) {
    // Scroll through once so one-time reveals fire before the full-page shot.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
  }
  await page.waitForTimeout(s.delay ?? 500);
  mkdirSync(dirname(s.out), { recursive: true });
  await page.screenshot({ path: s.out, fullPage: s.fullPage ?? false, type: "jpeg", quality: 85 });
  console.log("saved", s.out);
  await context.close();
}

await browser.close();
