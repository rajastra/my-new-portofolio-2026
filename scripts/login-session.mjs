// Opens a visible browser so the owner can log in to a local app by hand, then saves the
// session (cookies + localStorage) for capture-screens.mjs. Nothing is typed by this script.
// Usage: node scripts/login-session.mjs <loginUrl> <statePath> [urlPartAfterLogin]
import { chromium } from "@playwright/test";

const [loginUrl, statePath, after = "/home"] = process.argv.slice(2);
// Edge ships with Windows; avoids downloading a full Chromium just for a login window.
const browser = await chromium.launch({ headless: false, channel: process.env.LOGIN_CHANNEL ?? "msedge" });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto(loginUrl);
console.log("Waiting for you to log in…");
await page.waitForURL((u) => u.pathname.includes(after), { timeout: 10 * 60_000 });
await page.waitForLoadState("networkidle");
await context.storageState({ path: statePath });
console.log("saved session to", statePath);
await browser.close();
