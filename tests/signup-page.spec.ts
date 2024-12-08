import { test, expect } from "@playwright/test";
import { baseURL } from "./utils";

test("sign up page should navigate user to the information page when rname and universe are filled", async ({
  page,
}) => {
  await page.goto(baseURL);
  await page.getByPlaceholder("Enter your name").fill("Francis");
  await page.getByPlaceholder("Enter your universe").fill("Software");
  await page
    .getByLabel("hit the button to submit your name and universe")
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

test("submit button is disabled and text changes to Submitting when form is submitting", async ({
  page,
}) => {
  await page.goto(baseURL);
  await page.getByPlaceholder("Enter your name").fill("Francis");
  await page.getByPlaceholder("Enter your universe").fill("Software");
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

test("sign up page should make input fields as invalid when nothing is filled", async ({
  page,
}) => {
  await page.goto(baseURL);
  await page
    .getByLabel("hit the button to submit your name and universe")
    .click();
  await expect(
    page.locator("input[name='userName'][required]:invalid")
  ).toBeVisible();
  await expect(
    page.locator("input[name='jobTitle'][required]:invalid")
  ).toBeVisible();
});
