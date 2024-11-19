import { test, expect } from "@playwright/test";
import { baseURL } from "./utils";

test("sign up page should navigate user to the information page when username and job title are filled", async ({
  page,
}) => {
  await page.goto(baseURL);
  await page.getByPlaceholder("Enter your username").fill("Francis");
  await page.getByPlaceholder("Enter your job title").fill("Software");
  await page
    .getByLabel("hit the button to submit the username and job title")
    .click();
  await expect(page.getByLabel("site navigation")).toContainText(
    "Edit Profile"
  );
  await expect(page.getByLabel("site navigation")).toContainText(
    "Information Page"
  );
  await expect(page.locator("h1")).toContainText(
    "Welcome to the gallery of Rick and Morty"
  );
});

test("sign up page should make input fields as invalid when nothing is filled", async ({
  page,
}) => {
  await page.goto(baseURL);
  await page
    .getByLabel("hit the button to submit the username and job title")
    .click();
  await expect(
    page.locator("input[name='userName'][required]:invalid")
  ).toBeVisible();
  await expect(
    page.locator("input[name='jobTitle'][required]:invalid")
  ).toBeVisible();
});
