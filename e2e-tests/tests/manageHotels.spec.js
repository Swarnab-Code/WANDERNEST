import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
	await page.goto(UI_URL);

	await page.getByRole('link', { name: 'Login' }).click();

	await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

	await page.locator('[name=email]').fill('test@gmail.com');
	await page.locator('[name=password]').fill('123456');

	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page.getByText('Login Successful!')).toBeVisible();
});

test('should allow user to add a hotel', async ({ page }) => {
	await page.goto(`${UI_URL}add-hotel`);

	await page.locator('[name="name"]').fill('Test Hotel');
	await page.locator('[name="city"]').fill('Test City');
	await page.locator('[name="country"]').fill('Test Country');
	await page
		.locator('[name="description"]')
		.fill('This is a description for the Test Hotel');
	await page.locator('[name="pricePerNight"]').fill('100');
	await page.selectOption('select[name="starRating"]', '3');

	await page.getByText('Budget').click();

	await page.getByLabel('Free Wifi').check();
	await page.getByLabel('Parking').check();

	await page.locator('[name="adultCount"]').fill('2');
	await page.locator('[name="childCount"]').fill('1');

	await page.setInputFiles('[name="imageFiles"]', [
		path.join(__dirname, 'images', 'testImage1.jpeg'),
		path.join(__dirname, 'images', 'testImage2.jpeg'),
	]);

	await page.getByRole('button', { name: 'Save' }).click();
	await expect(page.getByText('Hotel Saved!')).toBeVisible();
});

test('should display hotels', async ({ page }) => {
	await page.goto(`${UI_URL}my-hotels`);

	await expect(page.getByText('User Hotel')).toBeVisible();
	await expect(page.getByText('Nice Hotel')).toBeVisible();
	await expect(page.getByText('City, Country')).toBeVisible();
	await expect(page.getByText('Family')).toBeVisible();
	await expect(page.getByText('₹500 per night')).toBeVisible();
	await expect(page.getByText('3 adults, 0 children')).toBeVisible();
	await expect(page.getByText('4 Star Rating')).toBeVisible();

	await expect(
		page.getByRole('link', { name: 'View Details' })
	).toBeVisible();
	await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});

test('should edit hotel', async ({ page }) => {
	await page.goto(`${UI_URL}my-hotels`);

	await page.getByRole('link', { name: 'View Details' }).first().click();

	await page.waitForSelector('[name="name"]', { state: 'attached' });
	await expect(page.locator('[name="name"]')).toHaveValue('User Hotel');

	await page.locator('[name="name"]').fill('User Hotel UPDATED');
	await page.getByRole('button', { name: 'Save' }).click();
	await expect(page.getByText('Hotel Saved!')).toBeVisible();

	await page.reload();

	await expect(page.locator('[name="name"]')).toHaveValue(
		'User Hotel UPDATED'
	);

	await page.locator('[name="name"]').fill('User Hotel');
	await page.getByRole('button', { name: 'Save' }).click();
});
