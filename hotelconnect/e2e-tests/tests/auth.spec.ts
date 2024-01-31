import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //get sign in button
  await page.getByRole("link",{name:"Sign In"}).click();
  
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();  

  //manually adding user and password

  await page.locator("[name=email]").fill("qwe@gmail.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button",{name:"Login"}).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Sign Out"})).toBeVisible();
  
});


