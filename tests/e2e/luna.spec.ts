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

test("LUNA timeline loads with every chapter collapsed", async ({ page }) => {
  await page.goto("/luna");
  const controls = page.locator("[data-version-toggle]");
  await expect(controls).toHaveCount(6);
  expect(
    await controls.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("aria-expanded")),
    ),
  ).toEqual(Array(6).fill("false"));
  await expect(page.locator("[data-version-panel]:visible")).toHaveCount(0);
  await expect(page.getByRole("tablist")).toHaveCount(0);
  await expect(page.getByRole("tab")).toHaveCount(0);
});

test("LUNA chapters expand, collapse, and remain independently open", async ({
  page,
}) => {
  await page.goto("/luna");
  const first = page.getByRole("button", { name: /v0\.1/ });
  const v2 = page.getByRole("button", { name: /v2\.0/ });
  await first.click();
  await v2.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(v2).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("[data-version-panel]:visible")).toHaveCount(2);
  await v2.click();
  await expect(v2).toHaveAttribute("aria-expanded", "false");
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("[data-development-timeline]")).not.toContainText(
    /January|February|March|April|May|June|July|August|September|October|November|December|20\d{2}/,
  );
});

test("LUNA publishes audited checkpoint metrics from the authoritative history", async ({
  page,
}) => {
  await page.goto("/luna");
  const expected = [
    ["foundation", "3,383", "575", "Unavailable"],
    ["stable-core", "11,695", "2,560", "179"],
    ["knowledge-era", "37,263", "16,631", "891"],
    ["identity-security", "42,137", "19,129", "1,038"],
    ["governed-business", "47,227", "21,087", "1,136"],
    ["v2-closure", "75,798", "32,642", "1,899"],
  ] as const;

  for (const [id, production, testCode, pytest] of expected) {
    await page.locator(`[data-version-toggle="${id}"]`).click();
    const metrics = page.locator(
      `[data-version-panel="${id}"] .record-metrics`,
    );
    await expect(metrics).toContainText(production);
    await expect(metrics).toContainText(testCode);
    await expect(metrics).toContainText(pytest);
  }

  const timeline = page.locator("[data-development-timeline]");
  await expect(timeline).not.toContainText("76,962");
  await expect(timeline).not.toContainText("33,099");
  await expect(timeline).not.toContainText("1,938");
  await expect(timeline).not.toContainText(/1,899 passed/i);
  await expect(page.locator(".development__metric-note")).toHaveCount(1);
  await expect(page.locator(".development__metric-note")).toHaveText(
    "Code and test counts show project scale and validation growth; they are not quality scores.",
  );
});

test("LUNA assigns capabilities to their audited introduction eras", async ({
  page,
}) => {
  await page.goto("/luna");
  await page.locator('[data-version-toggle="knowledge-era"]').click();
  await page.locator('[data-version-toggle="governed-business"]').click();
  await page.locator('[data-version-toggle="v2-closure"]').click();

  await expect(
    page.locator('[data-version-panel="knowledge-era"]'),
  ).toContainText("Knowledge Vault");
  await expect(
    page.locator('[data-version-panel="governed-business"]'),
  ).toContainText("Business Assistant");

  const v2Scope = page.locator(
    '[data-version-panel="v2-closure"] .development-record__scope',
  );
  await expect(v2Scope.locator("li")).toHaveCount(5);
  await expect(v2Scope).toContainText("integration of inherited");
  for (const inherited of [
    "Research",
    "Knowledge Vault",
    "Planner",
    "Business Assistant",
    "OAuth",
    "LUCID",
  ]) {
    await expect(
      v2Scope.locator("li", { hasText: new RegExp(`^${inherited}$`) }),
    ).toHaveCount(0);
  }
});

test("LUNA evidence uses the shared viewer from its v2 chapter", async ({
  page,
}) => {
  await page.goto("/luna");
  await page.getByRole("button", { name: /v2\.0/ }).click();
  const opener = page.locator('[data-evidence-open="local-system"]');
  await opener.click();
  const dialog = page.locator("[data-evidence-dialog]");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { level: 2 })).toHaveText(
    "Local system overview",
  );
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});

test("LUNA timeline has no non-image placeholder copy", async ({ page }) => {
  await page.goto("/luna");
  await expect(page.locator("main")).not.toContainText(
    /status pending|copy coming soon|evidence goes here|reserved for a real|capture pending|future scan/i,
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
