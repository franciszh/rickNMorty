import { expect, Page } from "@playwright/test";

export const baseURL = "https://rick-n-morty-three.vercel.app/";

export const signup = async (page: Page) => {
  await page.goto(baseURL);
  await page.getByPlaceholder("Enter your name").fill("Francis");
  await page.getByPlaceholder("Enter your universe").fill("106 Earth");
  await page
    .getByLabel("hit the button to submit your name and universe")
    .click();
  await expect(page.locator("h1")).toContainText(
    "Welcome to the gallery of Rick and Morty"
  );
};

export const goToEditProfilePage = async (page: Page) => {
  await signup(page);
  await page.getByRole("link", { name: "Edit Profile" }).click();
};
