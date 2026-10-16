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
      const objbtnOK1 = page.getByText('OK')

      await objBtnGo1.scrollIntoViewIfNeeded();
      await expect(objTextNMC).toBeVisible();
      await objBtnGo1.click();
      await expect(objbtnOK1).toBeVisible();
      await objbtnOK1.click();
      break;
    }

    case 'DANA SYARIAH INTERNAL': {
      const objBtnGo2 = page.locator("//a[@value='15']//button[@type='button'][normalize-space()='Go']")

      const objTextDanaSyariah = page.locator("//i[normalize-space()='Akses App Internal Sandia DANA SYARIAH']");
      const objbtnOK2 = page.getByText('OK')

      await objBtnGo2.scrollIntoViewIfNeeded();
      await expect(objTextDanaSyariah).toBeVisible();
      await objBtnGo2.click();
      await expect(objbtnOK2).toBeVisible();
      await objbtnOK2.click();
      break;
    }

    case 'UMC' : {
      const objBtnGo3 = page.locator("//a[@value='21']//button[@type='button'][normalize-space()='Go']")
      const objTextUMC = page.locator("//i[normalize-space()='Akses App Internal Order UMC']")
      const objbtnOK3 = page.getByText('OK')

      await objBtnGo3.scrollIntoViewIfNeeded();
      await expect(objTextUMC).toBeVisible();
      await objBtnGo3.click();
      await expect(objbtnOK3).toBeVisible();
      await objbtnOK3.click();
      break;

    }

    case 'CANDICE' : {

      const objBtnGo4 = page.locator("//a[@value='36']//button[@type='button'][normalize-space()='Go']")
      const objTextCandice = page.locator("//i[normalize-space()='Akses DBM Admin Aplikasi CANDICE']")
      const objbtnOK4 = page.getByText('OK')

      await objBtnGo4.scrollIntoViewIfNeeded();
      await expect(objTextCandice).toBeVisible();
      await objBtnGo4.click();
      await expect(objbtnOK4).toBeVisible();
      await objbtnOK4.click();
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