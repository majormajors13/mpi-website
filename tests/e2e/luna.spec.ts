import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage LUNA links remain connected", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#luna")).toHaveCount(1);
  const cta = page.getByRole("link", { name: "Explore LUNA" });
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

test("LUNA showcase has meaningful sections and reserved capture space", async ({
  page,
}) => {
  await page.goto("/luna");

  for (const id of [
    "continuity",
    "connections",
    "planning",
    "research",
    "decisions",
    "approval",
    "coordination",
  ]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }

  await expect(
    page.getByRole("heading", { name: "See LUNA work" }),
  ).toBeVisible();
  const captureFrames = page.locator(".capture__frame");
  expect(await captureFrames.count()).toBeGreaterThanOrEqual(10);
  const firstCapture = await captureFrames.first().boundingBox();
  expect(firstCapture).not.toBeNull();
  expect(firstCapture!.height).toBeGreaterThanOrEqual(190);
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
