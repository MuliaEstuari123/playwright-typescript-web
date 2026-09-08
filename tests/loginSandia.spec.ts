import { expect, test, Page } from '@playwright/test';
import 'dotenv/config';

let urlSandia = 'http://sandia-panel-baf-uat.apps.cntrdev.bussan.co.id/'
const Email = process.env.SANDIA_EMAIL!
const Password = process.env.SANDIA_PASSWORD!

export async function loginSandia(page: Page) {

  await test.step('open browser', async () => {
    await page.goto(urlSandia)
    await page.waitForTimeout(2000)
  });

  await test.step('validasi Login page', async () => {
    const objTextSandia = page.locator('h1:has-text("SANDIA")')
    if (await objTextSandia.isVisible()) {
      await expect(objTextSandia).toBeVisible()
    } else {
      console.log('text login tidak tampil')
      throw new Error('login heading tidak di temukan')
    }
  });

  await test.step('input credential sandia', async () => {
    const objInputUsername = page.getByRole('textbox', { name: 'Email' })
    await expect(objInputUsername).toBeVisible()
    await objInputUsername.fill(Email)

    const objInputPassword = page.getByRole('textbox', { name: 'Password' })
    await expect(objInputPassword).toBeVisible()
    await objInputPassword.fill(Password)

    const objBtnLogin = page.getByRole('button', { name: 'Login' })
    await expect(objBtnLogin).toBeVisible()
    await objBtnLogin.click()
  });

}

export async function pilihMenuSandia(page: Page, menu: string) {

  switch (menu) {

    case 'NMC': {
      const objBtnGo1 = page.locator("//a[@value='20']//button[@type='button'][normalize-space()='Go']");
      const objTextNMC = page.locator("//i[normalize-space()='Akses App Internal Sandia NMC']");
      const objbtnOK = page.getByText('OK')

      await objBtnGo1.scrollIntoViewIfNeeded();
      await expect(objTextNMC).toBeVisible();
      await objBtnGo1.click();
      await expect(objbtnOK).toBeVisible();
      await objbtnOK.click();
      break;
    }

    case 'DANA SYARIAH INTERNAL': {
      const objBtnGo2 = page.locator("//a[@value='15']//button[@type='button'][normalize-space()='Go']")

      const objTextDanaSyariah = page.locator("//i[normalize-space()='Akses App Internal Sandia DANA SYARIAH']");
      const objbtnOK = page.getByText('OK')

      await objBtnGo2.scrollIntoViewIfNeeded();
      await expect(objTextDanaSyariah).toBeVisible();
      await objBtnGo2.click();
      await expect(objbtnOK).toBeVisible();
      await objbtnOK.click();
      break;
    }

    default: {
      throw new Error(`Menu '${menu}' belum ada case-nya di pilihMenuSandia`)
    }
  }

}

// ==== Test khusus file ini sendiri (opsional, biar file ini tetep bisa di-run standalone) ====

// test.beforeEach('Login Sandia', async ({ page }) => {
//   await loginSandia(page)
// })

// test('Pilih menu sandia', async ({ page }) => {
//   await pilihMenuSandia(page, 'NMC')
// })