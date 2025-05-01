import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:5173/';

test('should allow the user to login', async ({ page }) => {
	await page.goto(FRONTEND_URL);

	// Click the "Login" link
	await page.getByRole('link', { name: 'Login' }).click();

	await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

	await page.locator('[name=email]').fill('test@gmail.com');
	await page.locator('[name=password]').fill('123456');

	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page.getByText('Login Successful!')).toBeVisible();
	await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

test('should allow user to register', async ({ page }) => {
	const randomNum = Math.floor(Math.random() * 90000) + 10000;
	const testEmail = `test${randomNum}@test.com`;

	await page.goto(FRONTEND_URL);

	await page.getByRole('link', { name: 'Login' }).click();
	await page.getByRole('link', { name: 'Create an account here' }).click();
	await expect(
		page.getByRole('heading', { name: 'Create an Account' })
	).toBeVisible();

	await page.locator('[name=firstName]').fill('test');
	await page.locator('[name=lastName]').fill('test');
	await page.locator('[name=email]').fill(testEmail);
	await page.locator('[name=password]').fill('123456');
	await page.locator('[name=confirmPassword]').fill('123456');

	await page.getByRole('button', { name: 'Create Account' }).click();

	await expect(page.getByText('Registration Success!')).toBeVisible();
	await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});
