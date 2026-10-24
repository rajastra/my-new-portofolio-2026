// Explores a logged-in SPA: lists same-origin links, or clicks each given label and prints
// where it leads (for apps that navigate with buttons).
// Usage: node scripts/explore-links.mjs <url> [storageState] [label1,label2,...]
import { chromium } from "@playwright/test";

const [url, storageState, labels] = process.argv.slice(2);
const browser = await chromium.launch();
const context = await browser.newContext({ storageState, viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });

if (!labels) {
  const links = await page.$$eval("a[href]", (as) =>
    [...new Map(as.map((a) => [a.getAttribute("href"), a.textContent.trim().replace(/\s+/g, " ").slice(0, 50)]))]
      .filter(([h]) => h && h.startsWith("/")),
  );
  for (const [href, text] of links) console.log(href, "|", text);
} else {
  for (const label of labels.split(",")) {
    await page.goto(url, { waitUntil: "networkidle" });
    try {
      await page.getByText(label, { exact: true }).first().click({ timeout: 5000 });
      await page.waitForLoadState("networkidle");
      console.log(label, "->", page.url());
    } catch (e) {
      console.log(label, "-> (failed)", e.message.split("\n")[0]);
    }
  }
}
await browser.close();
