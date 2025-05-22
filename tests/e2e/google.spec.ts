import { test, expect } from '@playwright/test';
import { Google } from '../../pages/google';
import fs from 'fs';

test('search for image', async ({ page }) => {
  const google = new Google(page);

  await page.route(/https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=tbn:ANd9Gc.*/, (route, request) => {
    const url = route.request().url();
    console.log('Interceptado:', url);
    return route.fulfill({
      status: 400,
      contentType: 'text/plain',
        });
      
  })

  await google.navegatTo();
  await google.clickSearchBar();
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(5000);

});


test('replace image', async ({ page }) => {
  const google = new Google(page);

  const imageBuffer = fs.readFileSync('C:/Users/vickv/OneDrive/Imagens/20230709_111722.jpg');

  await page.route(/https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=tbn:ANd9Gc.*/, (route, request) => {
    const url = route.request().url();
    console.log('Interceptado:', url);
    return route.fulfill({
      status: 200,
      contentType: 'image/jpg',
      body: imageBuffer,
        });
      
  })

  await google.navegatTo();
  await google.clickSearchBar();
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(5000);

});
