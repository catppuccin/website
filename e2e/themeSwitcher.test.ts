import { flavors } from "@catppuccin/palette";
import { test, expect, type Page } from "@playwright/test";

test.use({ colorScheme: "light" });

const assertCssVariable = async (page: Page, actual: string, expected: string) => {
  const cssVar = await page.evaluate(
    (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim(),
    actual,
  );
  expect(cssVar).toBe(expected);
};

test("changing theme works", async ({ page }) => {
  await page.goto("/");
  await assertCssVariable(page, "--base", flavors.latte.colors.base.hex);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(null);
  const themeSwitcher = page.locator("#themeSelector");
  await expect(themeSwitcher).toBeVisible();
  expect(await themeSwitcher.inputValue()).toBe("system");

  await themeSwitcher.selectOption("frappe");

  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("frappe");
  await assertCssVariable(page, "--base", flavors.frappe.colors.base.hex);
});

test("changing theme with view transitions works", async ({ page }) => {
  await page.goto("/blog/");
  await assertCssVariable(page, "--base", flavors.latte.colors.base.hex);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(null);
  const themeSwitcher = page.locator("#themeSelector");
  await expect(themeSwitcher).toBeVisible();
  expect(await themeSwitcher.inputValue()).toBe("system");

  await themeSwitcher.selectOption("macchiato");

  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("macchiato");
  await assertCssVariable(page, "--base", flavors.macchiato.colors.base.hex);

  await page.goto("/blog/celebrating-three-years-of-catppuccin/");
  await assertCssVariable(page, "--base", flavors.macchiato.colors.base.hex);

  await page.goto("/blog/");
  await assertCssVariable(page, "--base", flavors.macchiato.colors.base.hex);
});

test("theme switches on media query", async ({ page }) => {
  await page.goto("/");
  await assertCssVariable(page, "--base", flavors.latte.colors.base.hex);
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(null);
  const themeSwitcher = page.locator("#themeSelector");
  await expect(themeSwitcher).toBeVisible();
  expect(await themeSwitcher.inputValue()).toBe("system");

  await assertCssVariable(page, "--base", flavors.latte.colors.base.hex);
  await page.emulateMedia({ colorScheme: "dark" });
  await assertCssVariable(page, "--base", flavors.mocha.colors.base.hex);
});
