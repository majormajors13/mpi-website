import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const viewports = [
  { name: "320px phone", width: 320, height: 720 },
  { name: "360px phone", width: 360, height: 800 },
  { name: "390px phone", width: 390, height: 844 },
  { name: "430px phone", width: 430, height: 932 },
  { name: "500px phone", width: 500, height: 900 },
  { name: "landscape phone", width: 844, height: 390 },
  { name: "768px tablet", width: 768, height: 1024 },
  { name: "1024px laptop", width: 1024, height: 768 },
  { name: "1280px desktop", width: 1280, height: 900 },
  { name: "1440px desktop", width: 1440, height: 1000 },
  { name: "1920px desktop", width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const dimensions = await page.evaluate(() => ({
      bodyClientWidth: document.body.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      rootClientWidth: document.documentElement.clientWidth,
      rootScrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.bodyScrollWidth).toBeLessThanOrEqual(
      dimensions.bodyClientWidth,
    );
    expect(dimensions.rootScrollWidth).toBeLessThanOrEqual(
      dimensions.rootClientWidth,
    );
  });
}

for (const percentage of [125, 150, 200]) {
  test(`reflows without overflow at ${percentage}% text size`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.addStyleTag({
      content: `html { font-size: ${percentage}% !important; }`,
    });

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("uses a logical landmark and heading structure", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("header")).toHaveCount(1);
  await expect(page.locator("header nav")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);

  const headings = await page
    .locator("main :is(h1, h2, h3, h4, h5, h6)")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        level: Number(element.tagName.slice(1)),
        text: element.textContent?.trim() ?? "",
      })),
    );

  expect(headings[0]?.level).toBe(1);
  expect(headings.every(({ text }) => text.length > 0)).toBe(true);
  for (let index = 1; index < headings.length; index += 1) {
    expect(headings[index].level).toBeLessThanOrEqual(
      headings[index - 1].level + 1,
    );
  }

  const labelledSections = page.locator("main section[aria-labelledby]");
  for (let index = 0; index < (await labelledSections.count()); index += 1) {
    const labelId = await labelledSections
      .nth(index)
      .getAttribute("aria-labelledby");
    expect(labelId).not.toBeNull();
    await expect(page.locator(`#${labelId}`)).toHaveCount(1);
  }
});

test("build log reader preserves and navigates fifteen entries", async ({
  page,
}) => {
  await page.goto("/");

  const buildLog = page.locator("#build-log");
  await expect(buildLog).toBeVisible();
  await expect(buildLog.locator("article")).toHaveCount(15);
  const indexButtons = buildLog.locator("[data-log-select]");
  await expect(indexButtons).toHaveCount(15);
  await expect(buildLog.locator("h3")).toHaveText([
    "Building Major Problem Industries",
    "Getting the Site Production-Ready",
    "Cloudflare Fought Back",
    "Giving LUNA Its Own Space",
    "Making LUNA Easier to Explain",
    "Untangling Authentication Failures",
    "Making Migrations the Only Path",
    "Protecting Multi-Step State",
    "Putting Approval in the Execution Path",
    "Finding the Knowledge Vault in Pieces",
    "Making LUNA Launch Like Software",
    "Exposing Cross-Platform Assumptions",
    "Keeping a Large Test Suite Useful",
    "Explaining Features in Human Terms",
    "Treating Restraint as Engineering",
  ]);

  const newest = buildLog.locator('[data-log-select="14"]');
  await expect(newest).toHaveAttribute("aria-pressed", "true");
  await expect(buildLog.locator('[data-log-panel="14"]')).toBeVisible();
  await expect(buildLog.locator('[data-log-panel="14"] h3')).toHaveText(
    "Treating Restraint as Engineering",
  );

  const initialBody = await buildLog
    .locator('[data-log-panel="14"] .build-log__entry-body')
    .textContent();
  const oldest = buildLog.locator('[data-log-select="0"]');
  await oldest.click();
  await expect(oldest).toHaveAttribute("aria-pressed", "true");
  await expect(buildLog.locator('[data-log-panel="0"] h3')).toHaveText(
    "Building Major Problem Industries",
  );
  expect(
    await buildLog
      .locator('[data-log-panel="0"] .build-log__entry-body')
      .textContent(),
  ).not.toBe(initialBody);

  const previous = buildLog.getByRole("button", { name: "Previous" });
  const next = buildLog.getByRole("button", { name: "Next" });
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  await next.click();
  await expect(buildLog.locator('[data-log-panel="1"]')).toBeVisible();

  await newest.focus();
  await page.keyboard.press("Enter");
  await expect(newest).toHaveAttribute("aria-pressed", "true");
  await expect(next).toBeDisabled();
  await previous.click();
  await expect(buildLog.locator('[data-log-panel="13"]')).toBeVisible();
});

test("navigation links resolve to real targets in document order", async ({
  page,
}) => {
  await page.goto("/");

  const targets = ["top", "luna", "workshop", "about", "build-log"];
  const hrefs = await page
    .locator("nav a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));

  expect(hrefs).toEqual(targets.map((target) => `#${target}`));
  for (const target of targets) {
    await expect(page.locator(`#${target}`)).toHaveCount(1);
  }
});

test("sticky navigation leaves section targets visible", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  for (const target of ["luna", "workshop", "about", "build-log"]) {
    await page.locator(`nav a[href="#${target}"]`).click();
    const headerBox = await page.locator("header").boundingBox();
    const targetBox = await page.locator(`#${target}`).boundingBox();

    expect(headerBox).not.toBeNull();
    expect(targetBox).not.toBeNull();
    expect(targetBox!.y).toBeGreaterThanOrEqual(headerBox!.height);
  }
});

test("skip link moves focus to the main landmark", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("keyboard focus follows the visual navigation order", async ({ page }) => {
  await page.goto("/");
  const expectedFocusOrder = [
    ".skip-link",
    ".site-brand",
    'nav a[href="#top"]',
    'nav a[href="#luna"]',
    'nav a[href="#workshop"]',
    'nav a[href="#about"]',
    'nav a[href="#build-log"]',
    ".hero__actions a",
  ];

  for (const selector of expectedFocusOrder) {
    await page.keyboard.press("Tab");
    await expect(page.locator(selector)).toBeFocused();
  }
});

test("logos reserve dimensions and use intentional accessible names", async ({
  page,
}) => {
  await page.goto("/");
  const logoSelectors = [".site-brand__logo", ".hero__logo", ".luna__logo"];
  const images = await Promise.all(
    logoSelectors.map((selector) =>
      page.locator(selector).evaluate((element) => {
        const image = element as HTMLImageElement;
        return {
          alt: image.alt,
          height: image.height,
          srcset: image.srcset,
          width: image.width,
        };
      }),
    ),
  );

  for (const image of images) {
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  }
  expect(images[0].alt).toBe("");
  expect(images[1].alt.length).toBeGreaterThan(0);
  expect(images[2].alt).toBe("");
  expect(images[1].srcset.length).toBeGreaterThan(0);
  expect(images[2].srcset.length).toBeGreaterThan(0);
});

test("phone links provide practical touch targets", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const targets = page.locator("header a, .hero__actions a");
  for (let index = 0; index < (await targets.count()); index += 1) {
    const box = await targets.nth(index).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("reduced motion removes animation and smooth scrolling", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const motion = await page.evaluate(() => ({
    animation: getComputedStyle(
      document.querySelector<HTMLElement>(".status-label__indicator")!,
    ).animationName,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }));

  expect(motion.animation).toBe("none");
  expect(motion.scrollBehavior).toBe("auto");
});

test("focus remains visible in forced-colors mode", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto("/");
  await page.keyboard.press("Tab");

  const outline = await page.locator(".skip-link").evaluate((element) => {
    const styles = getComputedStyle(element);
    return { style: styles.outlineStyle, width: styles.outlineWidth };
  });

  expect(outline.style).not.toBe("none");
  expect(Number.parseFloat(outline.width)).toBeGreaterThan(0);
});

test("has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const highImpactViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(highImpactViolations).toEqual([]);
});

test("publishes production metadata and crawler assets", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Major Problem Industries");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://majorproblemindustries.com/",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Major Problem Industries",
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    /independent workshop/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://majorproblemindustries.com/social-preview.png",
  );
  const faviconHref = await page
    .locator('link[rel="icon"]')
    .getAttribute("href");
  expect(faviconHref).toMatch(/\/_astro\/favicon\.[\w-]+\.png$/);

  expect((await request.get("/social-preview.png")).ok()).toBe(true);
  expect((await request.get(faviconHref!)).ok()).toBe(true);
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Allow: /");
  expect(
    await page.locator("html").evaluate((element) => element.outerHTML),
  ).not.toContain("localhost");
});

test("builds an accessible 404 page with a working home link", async ({
  page,
}) => {
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Major problem detected.",
  );
  const homeLink = page.getByRole("link", {
    name: "Return to Major Problem Industries",
  });
  await expect(homeLink).toHaveAttribute("href", "/");
  await homeLink.click();
  await expect(page).toHaveURL("/");
});
