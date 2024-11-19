import { test, expect } from "@playwright/test";
import { goToEditProfilePage } from "./utils";

test.beforeEach(async ({ page }) => {
  await goToEditProfilePage(page);
});

test("the previously filled username and job title are visiable", async ({
  page,
}) => {
  await expect(page.getByPlaceholder("Enter your username")).toHaveValue(
    "Francis"
  );
  await expect(page.getByPlaceholder("Enter your job title")).toHaveValue(
    "Software"
  );
});

test("the username and job title are updated with success message", async ({
  page,
}) => {
  await page.getByPlaceholder("Enter your username").fill("Francis Zhao");
  await page.getByPlaceholder("Enter your job title").fill("Software Engineer");
  await page
    .getByLabel("hit the button to submit the username and job title")
    .click();
  await expect(page.locator("form").getByRole("alert")).toBeVisible();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Well you've got a new identity in this world."
  );
});

test("remove either username or job title to terminate the session and navigate back the signup form", async ({
  page,
}) => {
  await page.getByPlaceholder("Enter your username").fill("");
  await page.getByPlaceholder("Enter your job title").fill("");
  await page
    .getByLabel("hit the button to submit the username and job title")
    .click();
  await expect(page.getByRole("heading")).toContainText(
    "Rick told me not to talk with strangers!!!"
  );
});
