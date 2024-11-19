import { test, expect } from "@playwright/test";
import { signup, baseURL } from "./utils";

test.beforeEach(async ({ page }) => {
  await signup(page);
});

test.describe("general use cases", () => {
  test("click one tile should pop up the information modal", async ({
    page,
  }) => {
    await page
      .getByRole("link", { name: "Morty Smith's character image" })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog")).toContainText("Gender:Male");
    await expect(page.getByRole("dialog")).toContainText("Species:Human");
    await expect(page.getByRole("dialog")).toContainText("Status:Alive");
    await expect(page.getByRole("dialog")).toContainText(
      "Live:Citadel of Ricks"
    );
    await expect(page.getByRole("dialog")).toContainText("Origin:unknown");
    await expect(page.getByRole("dialog")).toContainText("Type:unknown");
    await expect(page.getByLabel("dismiss the modal")).toBeVisible();
    await page.getByLabel("dismiss the modal").click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("should have pagination page selection work as expected", async ({
    page,
  }) => {
    await expect(page.getByLabel("pagination")).toBeVisible();
    await page.getByLabel("page 3").click();
    await expect(
      page.getByRole("heading", { name: "You are viewing page 3" })
    ).toBeVisible();
    await page
      .getByRole("link", { name: "Big Morty's character image" })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("should have pagination previous/next work as expected", async ({
    page,
  }) => {
    await expect(page.getByLabel("pagination")).toBeVisible();
    await page.getByLabel("next page").click();
    await expect(
      page.getByRole("heading", { name: "You are viewing page 2" })
    ).toBeVisible();
    await page.getByLabel("previous page").click();
    await expect(
      page.getByRole("heading", { name: "You are viewing page 1" })
    ).toBeVisible();
  });

  test("should have pagination previous/next disabled when current page is at boundary", async ({
    page,
  }) => {
    await expect(page.getByLabel("pagination")).toBeVisible();
    await expect(page.getByLabel("previous page")).toBeDisabled();
    await page.getByLabel("last page, page").click();
    await expect(page.getByLabel("next page")).toBeDisabled();
  });

  test("should access certain page by url", async ({ page }) => {
    await page.goto(baseURL + "information-page?page=7");
    await expect(
      page.getByRole("heading", { name: "You are viewing page 7" })
    ).toBeVisible();
    await expect(page.getByLabel("page 7")).toHaveAttribute("data-selected");
  });

  test("page can be replayed by forward and backward button", async ({
    page,
  }) => {
    await page.getByLabel("next page").click();
    await expect(
      page.getByRole("heading", { name: "You are viewing page 2" })
    ).toBeVisible();
    await page.goBack();
    await expect(
      page.getByRole("heading", { name: "You are viewing page 1" })
    ).toBeVisible();
    await page.goForward();
    await expect(
      page.getByRole("heading", { name: "You are viewing page 2" })
    ).toBeVisible();
  });

  test("should access certain modal by url", async ({ page }) => {
    await page.goto(baseURL + "information-page?page=2&charId=3");
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("modal can be replayed by forward and backward button", async ({
    page,
  }) => {
    await page.goto(baseURL + "information-page?page=2&charId=3");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await page.goForward();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("should have error page capture the error when page is out of boundary", async ({
    page,
  }) => {
    await page.goto(baseURL + "information-page?page=500");
    await expect(
      page.getByRole("heading", { name: "Something went wrong! Time to" })
    ).toBeVisible();
  });
});

test.describe("A11y use cases", () => {
  test("user can use Tab to traverse the information tiles", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Rick Sanchez's character" }).focus();
    await page
      .getByRole("link", { name: "Rick Sanchez's character" })
      .press("Tab");
    await expect(
      page.getByRole("link", { name: "Morty Smith's character image" })
    ).toBeFocused();
  });

  test("user can use Enter to access modal", async ({ page }) => {
    await page
      .getByRole("link", { name: "Rick Sanchez's character" })
      .press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("user can use Escape to dismiss modal", async ({ page }) => {
    await page
      .getByRole("link", { name: "Rick Sanchez's character" })
      .press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("dialog").press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("focus does not escape the modal", async ({ page }) => {
    await page
      .getByRole("link", { name: "Rick Sanchez's character" })
      .press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("dialog").press("Tab");
    await page.getByLabel("dismiss the modal").press("Tab");
    await page.getByRole("dialog").press("Tab");
    await page.getByLabel("dismiss the modal").press("Tab");
    await expect(page.getByRole("dialog")).toBeFocused();
  });

  test("focus goes back to the original tile when the modal is dismissed", async ({
    page,
  }) => {
    await page
      .getByRole("link", { name: "Rick Sanchez's character" })
      .press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("dialog").press("Tab");
    await page.getByLabel("dismiss the modal").press("Enter");
    await expect(
      page.getByRole("link", { name: "Rick Sanchez's character" })
    ).toBeFocused();
  });

  test("focus goes to the page count message when new page is accessed", async ({
    page,
  }) => {
    await page.getByLabel("page 3").click();
    await expect(
      page.getByRole("heading", { name: "You are viewing page 3" })
    ).toBeFocused();
  });
});
