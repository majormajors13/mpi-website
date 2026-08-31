import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const projectPages = [
  {
    path: "/projects/software",
    heading: "AI & Software",
  },
  {
    path: "/projects/mpi-website",
    heading: "Major Problem Industries Website",
  },
  {
    path: "/projects/motionless-moments",
    heading: "Motionless Moments Photography",
  },
];

test("homepage AI and Software card links to its project index", async ({
  page,
}) => {
  await page.goto("/");
  const workshop = page.locator("#workshop");
  await expect(
    workshop.getByRole("heading", { name: "AI & Software" }),
  ).toBeVisible();
  const link = workshop.getByRole("link", { name: "View Projects" });
  await expect(link).toHaveAttribute("href", "/projects/software");
  await link.click();
  await expect(page).toHaveURL("/projects/software");
});

test("software index presents three real project destinations", async ({
  page,
}) => {
  await page.goto("/projects/software");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "AI & Software",
  );
  await expect(page.locator(".project-card")).toHaveCount(3);

  for (const project of [
    { name: "LUNA", href: "/luna" },
    { name: "Major Problem Industries", href: "/projects/mpi-website" },
    {
      name: "Motionless Moments Photography",
      href: "/projects/motionless-moments",
    },
  ]) {
    const card = page.locator(".project-card", {
      has: page.getByRole("heading", { name: project.name, exact: true }),
    });
    await expect(
      card.getByRole("link", { name: "Open project" }),
    ).toHaveAttribute("href", project.href);
  }
});

for (const project of projectPages.slice(1)) {
  test(`${project.path} loads and returns to the software index`, async ({
    page,
  }) => {
    await page.goto(project.path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      project.heading,
    );

    const backLink = page.getByRole("link", { name: "AI & Software Projects" });
    await expect(backLink).toHaveAttribute("href", "/projects/software");
    await backLink.click();
    await expect(page).toHaveURL("/projects/software");
  });
}

test("MPI website case study presents live proof without screenshots", async ({
  page,
}) => {
  await page.goto("/projects/mpi-website");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("Status // Live", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Type // Production website", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Build // Astro + TypeScript", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".capture")).toHaveCount(0);
  await expect(page.getByRole("img")).toHaveCount(0);

  for (const link of [
    { name: "Explore LUNA", href: "/luna" },
    { name: "Read the Build Log", href: "/#build-log" },
    { name: "Back to AI & Software", href: "/projects/software" },
  ]) {
    await expect(page.getByRole("link", { name: link.name })).toHaveAttribute(
      "href",
      link.href,
    );
  }
});

test("Motionless Moments placeholder retains reserved screenshot space", async ({
  page,
}) => {
  await page.goto("/projects/motionless-moments");
  await expect(page.locator(".capture")).toBeVisible();
});

for (const viewport of [
  { name: "phone", width: 320, height: 720 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  test(`project routes have no horizontal overflow on ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    for (const project of projectPages) {
      await page.goto(project.path);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
    }
  });
}

test("project routes reflow at 200 percent text size", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const project of projectPages) {
    await page.goto(project.path);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});

test("project routes have no serious or critical axe violations", async ({
  page,
}) => {
  for (const project of projectPages) {
    await page.goto(project.path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const highImpactViolations = results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    );
    expect(highImpactViolations).toEqual([]);
  }
});
