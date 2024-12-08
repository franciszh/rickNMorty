import { test, expect } from "@playwright/test";
import { goToEditProfilePage } from "./utils";

test.beforeEach(async ({ page }) => {
  await goToEditProfilePage(page);
});

test("the previously filled name and universe are visiable", async ({
  page,
}) => {
  await expect(page.getByPlaceholder("Enter your name")).toHaveValue("Francis");
  await expect(page.getByPlaceholder("Enter your universe")).toHaveValue(
    "Software"
  );
});

test("submit button is disabled and text changes to Submitting when form is submitting", async ({
  page,
}) => {
  await page.getByPlaceholder("Enter your name").fill("Francis Zhao");
  await page.getByPlaceholder("Enter your universe").fill("Software Engineer");
  await page
    .getByLabel("hit the button to submit your name and universe")
    .click();
  await expect(
    page.getByLabel("hit the button to submit your name and universe")
  ).toBeDisabled();
  await expect(
    page.getByLabel("hit the button to submit your name and universe")
  ).toContainText("Submitting");
});

test("your name and universe are updated with success message", async ({
  page,
}) => {
  await page.getByPlaceholder("Enter your name").fill("Francis Zhao");
  await page.getByPlaceholder("Enter your universe").fill("Software Engineer");
  await page
    .getByLabel("hit the button to submit your name and universe")
    .click();
  await expect(page.locator("form").getByRole("alert")).toBeVisible();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Well you've got a new identity in this world."
  );
});

test("remove either name or universe to terminate the session and navigate back the signup form", async ({
  page,
}) => {
  await page.getByPlaceholder("Enter your name").fill("");
  await page.getByPlaceholder("Enter your universe").fill("");
  await page
    .getByLabel("hit the button to submit your name and universe")
    .click();
  await expect(page.getByRole("heading")).toContainText(
    "Rick told me not to talk with strangers!!!"
  );
});
