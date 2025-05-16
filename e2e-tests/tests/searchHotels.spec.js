import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
	await page.goto(FRONTEND_URL);

	await page.getByRole('link', { name: 'Login' }).click();
	await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

	await page.locator('[name=email]').fill('test@gmail.com');
	await page.locator('[name=password]').fill('123456');

	await page.getByRole('button', { name: 'Login' }).click();
	await expect(page.getByText('Login Successful!')).toBeVisible();
});

test('should show hotel search results', async ({ page }) => {
	await page.goto(FRONTEND_URL);

	await page.getByPlaceholder('Where are you going?').fill('City');
	await page.getByRole('button', { name: 'Search' }).click();

	await expect(page.getByText('Hotels found in City')).toBeVisible();
	await expect(page.getByText('User Hotel')).toBeVisible();
});

test('should show hotel detail', async ({ page }) => {
	await page.goto(FRONTEND_URL);

	await page.getByPlaceholder('Where are you going?').fill('City');
	await page.getByRole('button', { name: 'Search' }).click();

	await page.getByText('User Hotel').click();
	await expect(page).toHaveURL(/detail/);
	await expect(page.getByRole('button', { name: 'Book now' })).toBeVisible();
});
