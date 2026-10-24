import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Home page & role view switcher", () => {
  test("recruiter text visible and engineer hidden by default", async ({ page }) => {
    await page.goto("/");

    const recruiterElements = page.locator('[data-only="recruiter"]');
    const engineerElements = page.locator('[data-only="engineer"]');

    await expect(recruiterElements.first()).toBeVisible();
    await expect(engineerElements.first()).toBeHidden();
  });

  test("click Engineer -> engineer text visible and URL has view=engineer", async ({ page }) => {
    await page.goto("/");

    const engineerButton = page.getByRole("radio", { name: "Engineer" });
    await engineerButton.click();

    const recruiterElements = page.locator('[data-only="recruiter"]');
    const engineerElements = page.locator('[data-only="engineer"]');

    await expect(engineerElements.first()).toBeVisible();
    await expect(recruiterElements.first()).toBeHidden();
    expect(page.url()).toContain("view=engineer");
  });

  test("/?view=engineer loads engineer view", async ({ page }) => {
    await page.goto("/?view=engineer");

    const recruiterElements = page.locator('[data-only="recruiter"]');
    const engineerElements = page.locator('[data-only="engineer"]');

    await expect(engineerElements.first()).toBeVisible();
    await expect(recruiterElements.first()).toBeHidden();
  });

  test("/id has <html lang='id'>", async ({ page }) => {
    await page.goto("/id");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", "id");
  });

  test("case study page /projects/school-erp opens", async ({ page }) => {
    await page.goto("/projects/school-erp");
    await expect(page.locator("h1")).toContainText("School ERP");
  });

  test("a11y: no serious or critical violations on / and case study", async ({ page }) => {
    // Measure the settled page: with motion on, axe would sample text mid-fade.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const homeScan = await new AxeBuilder({ page }).analyze();
    const homeViolations = homeScan.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );
    expect(homeViolations).toEqual([]);

    await page.goto("/projects/school-erp");
    const caseScan = await new AxeBuilder({ page }).analyze();
    const caseViolations = caseScan.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );
    expect(caseViolations).toEqual([]);
  });

  test("a11y in dark mode: no serious or critical violations on / and case study", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    for (const path of ["/", "/projects/ukm-booking"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveClass(/dark/);
      const scan = await new AxeBuilder({ page }).analyze();
      const serious = scan.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious, path).toEqual([]);
    }
  });

  test("submitting empty contact form shows three field errors", async ({ page }) => {
    await page.goto("/");
    const submitBtn = page.getByRole("button", { name: /send/i });
    await submitBtn.click();

    await expect(page.locator("#name-error")).toBeVisible();
    await expect(page.locator("#email-error")).toBeVisible();
    await expect(page.locator("#message-error")).toBeVisible();
  });
});
