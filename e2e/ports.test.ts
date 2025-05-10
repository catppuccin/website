import { categories, ports } from "@data/ports";
import { test, expect } from "@playwright/test";

test("search filter works", async ({ page }) => {
  await page.goto("/ports");

  await page.getByRole("textbox").fill("tailwindcss");
  await page.waitForTimeout(100);

  expect(await page.locator(".port-card").count()).toBe(1);
  expect(new URL(page.url()).searchParams.get("q")).toBe("tailwindcss");
});

test("platform filter works", async ({ page }) => {
  await page.goto("/ports");

  await page.getByLabel("Linux").evaluate((element) => (element as HTMLElement).click());

  expect(await page.locator(".port-card").count()).toBe(ports.filter((port) => port.platform.includes("linux")).length);
  expect(new URL(page.url()).searchParams.get("p")).toBe("linux");
});

test("category filter works", async ({ page }) => {
  await page.goto("/ports");

  await page.getByLabel("Userstyles").evaluate((element) => (element as HTMLElement).click());

  expect(await page.locator(".port-card").count()).toBe(categories.find((cat) => cat.key === "userstyle")?.portCount);
  expect(new URL(page.url()).searchParams.get("c")).toBe("userstyle");

  // Deselect the category on another click
  await page.getByLabel("Userstyles").evaluate((element) => (element as HTMLElement).click());

  expect(await page.locator(".port-card").count()).toBe(ports.length);
});

test("ports and userstyles are differentiated", async ({ page }) => {
  await page.goto("/ports");

  await page.getByRole("textbox").fill("mdbook");
  await page.waitForTimeout(200);

  expect(await page.locator(".port-card").count()).toBe(2);
  expect(new URL(page.url()).searchParams.get("q")).toBe("mdbook");
  const portNames = page.locator(".port-name");
  expect(portNames.nth(0)).toContainText(/mdBook \(userstyle\)/i);
  expect(portNames.nth(1)).toContainText(/mdBook/i);
});
