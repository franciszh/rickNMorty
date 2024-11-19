import { test, expect } from "@playwright/test";
import { baseURL } from "./utils";

test("accessing information page without signup is blocked", async ({
  page,
}) => {
  await page.goto(baseURL + "information-page");
  await expect(
    page.getByRole("heading", { name: "Rick told me not to talk with" })
  ).toBeVisible();
});

test("accessing modal without signup is blocked", async ({ page }) => {
  await page.goto(baseURL + "information-page?charId=5");
  await expect(
    page.getByRole("heading", { name: "Rick told me not to talk with" })
  ).toBeVisible();
});

test("accessing profile edit without signup is blocked", async ({ page }) => {
  await page.goto(baseURL + "edit-profile");
  await expect(
    page.getByRole("heading", { name: "Rick told me not to talk with" })
  ).toBeVisible();
});
