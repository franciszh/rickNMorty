import { expect, Page } from "@playwright/test";

export const baseURL = "https://rick-n-morty-three.vercel.app/";

export const signup = async (page: Page) => {
  await page.goto(baseURL);
  await page.getByPlaceholder("Enter your username").fill("Francis");
  await page.getByPlaceholder("Enter your job title").fill("Software");
  await page
    .getByLabel("hit the button to submit the username and job title")
    .click();
  await expect(page.locator("h1")).toContainText(
    "Welcome to the gallery of Rick and Morty"
  );
};

export const goToEditProfilePage = async (page: Page) => {
  await signup(page);
  await page.getByRole("link", { name: "Edit Profile" }).click();
};
