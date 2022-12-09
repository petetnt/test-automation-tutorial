import { test, expect } from '@playwright/test';

test('User should be able to login with correct credentials', async ({ page }) => {
  // Go to page
  await page.goto('http://localhost:3000/');

  // Find the email input by label and fill it with email
  await page.fill('label:has-text("Email")', 'test@vincit.com');

  // Find the password input by label and fill it with password
  await page.fill('label:has-text("Password")', 'testpassword');

  // Click the submit button
  const submitButton = page.getByRole('button', { name: 'Login' });
  await submitButton.click();

  // Ensure that we are now on dashboard!
  await expect(page).toHaveURL(/.*dashboard/);
});

test('User should see an error message when logging in with invalid credentials', async ({ page }) => {
  // Go to page
  await page.goto('http://localhost:3000/');

  // Find the email input by label and fill it with wrong email
  await page.fill('label:has-text("Email")', 'wrong@vincit.com');

  // Find the password input by label and fill it with wrong password
  await page.fill('label:has-text("Password")', 'wrong');

  // Click the submit button
  const submitButton = page.getByRole('button', { name: 'Login' });
  await submitButton.click();

  // Ensure that the error message is visible
  await expect(page.locator("text=Email or password was wrong")).toBeVisible();
});

test('Reset password link should redirect to reset password page', async ({ page }) => {
  // Go to page
  await page.goto('http://localhost:3000/');

  // Click the forgot password link
  await page.getByText("Forgot password").click();

  // Ensure that we are now on forgot password page!
  await expect(page).toHaveURL(/.*forgot-password/);
});
