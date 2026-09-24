import { expect, test, Page } from '@playwright/test';

import 'dotenv/config';

const URL = 'https://bosswebapp-uat.bussan.co.id/authorize?client_id=e6b05c07-474b-427b-adcc-aaec225548d6&redirect_uri=https%3A%2F%2Fbosswebapp-uat.bussan.co.id%2Fcallback&response_type=code&scope=openid+profile+offline_access&state=15c05eea9bb140349e2b6bff66ea34f5&code_challenge=lDA1byTccS6tuZJEbYlBkcC0MTcS7A6JVK0r8Sgm-cA&code_challenge_method=S256'

const username = process.env.OPEX_EMAIL!
const password = process.env.OPEX_PASSWORD!

export async function loginOPEX(page : Page) {

  await test.step('Open Browser', async () => {
    await page.goto(URL);
    await page.waitForLoadState('domcontentloaded');
  });

  await test.step('input credential login', async () => {
    const loginHeading = page.locator('h2:has-text("Login")');
    await expect(loginHeading, 'Login heading tidak ditemukan').toBeVisible();

    const usernameField = page.locator('#username');
    await expect(usernameField).toBeVisible();
    await usernameField.fill(username);

    const passwordField = page.locator('#password');
    await expect(passwordField).toBeVisible();
    await passwordField.fill(password);

    const loginButton = page.locator("//button[normalize-space()='Login']");
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const klikOK = page.getByText('OK', { exact : true });

    // klik OK pertama setelah login
    await expect(klikOK).toBeVisible();
    await klikOK.click();

    const objTextOpex = page.getByText('OPEX', { exact: true });
    await expect(objTextOpex).toBeVisible();
    await objTextOpex.click();

    
    let loop1 = 2;

    for ( let i = 0; i < loop1; i++) {

        await expect(klikOK).toBeVisible()
        await klikOK.click()

    }
    
  });
}


// test ('login Opex BOSS', async ({ page }) => {

// await loginOPEX(page)


// })






