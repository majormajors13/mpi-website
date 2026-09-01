import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage LUNA links remain connected", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#luna")).toHaveCount(1);
  const cta = page.getByRole("link", { name: "Meet LUNA" });
  await expect(cta).toHaveAttribute("href", "/luna");
  await cta.click();
  await expect(page).toHaveURL("/luna");
});

test("LUNA showcase has its identity and a working home link", async ({
  page,
}) => {
  await page.goto("/luna");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("LUNA");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(
    page.getByText("Luminary Unit of Nuisance Abatement"),
  ).toBeVisible();
  await expect(page.locator(".luna-hero__logo")).toHaveAttribute("alt", "");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://majorproblemindustries.com/luna/",
  );

  const homeLink = page.getByRole("link", {
    name: "Return to Major Problem Industries",
  });
  await expect(homeLink).toHaveAttribute("href", "/");
  await homeLink.click();
  await expect(page).toHaveURL("/");
});

for (const viewport of [
  { name: "phone", width: 320, height: 720 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  test(`LUNA showcase has no horizontal overflow on ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/luna");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("LUNA archive uses approved evidence and hides empty folders", async ({
  page,
}) => {
  await page.goto("/luna");
  await expect(page.locator("#archive")).toBeVisible();
  await expect(page.locator(".archive-folder")).toHaveCount(1);
  await expect(
    page.locator(".archive-folder summary").getByText("Architecture", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByText("Capture pending")).toHaveCount(0);
  const opener = page.locator('#archive [data-evidence-open="local-system"]');
  await opener.click();
  const dialog = page.locator("[data-evidence-dialog]");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { level: 2 })).toHaveText(
    "Local system overview",
  );
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});

test("LUNA version cards select records without public dates", async ({
  page,
}) => {
  await page.goto("/luna");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(6);
  const v2 = page.getByRole("tab", { name: /v2\.0/ });
  await v2.click();
  await expect(v2).toHaveAttribute("aria-selected", "true");
  const panel = page.getByRole("tabpanel").filter({ visible: true });
  await expect(panel).toContainText("1,346 passed");
  await expect(panel).toContainText("1,507 passed");
  await expect(panel).toContainText("1,518 passed");
  await expect(panel).toContainText("not a final authoritative test total");
  await expect(page.locator("[data-development-timeline]")).not.toContainText(
    /January|February|March|April|May|June|July|August|September|October|November|December|20\d{2}/,
  );
});

test("LUNA timeline supports arrow-key selection", async ({ page }) => {
  await page.goto("/luna");
  const first = page.getByRole("tab").first();
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab").nth(1)).toBeFocused();
  await expect(page.getByRole("tab").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("LUNA showcase reflows at 200% text size", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/luna");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("LUNA showcase has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/luna");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const highImpactViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(highImpactViolations).toEqual([]);
});
