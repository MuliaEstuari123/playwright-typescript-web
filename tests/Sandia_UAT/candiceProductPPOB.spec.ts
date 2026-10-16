import { test,expect,Page,TestInfo } from '@playwright/test'
import { combineScreenshotsToPdf } from '../Helper/ScreenshotsToPdf'
import { loginSandia,pilihMenuSandia } from './loginSandia'

test.describe('CANDICE - Master Product PPOB', () => {
  test.skip(!!process.env.CI, 'Domain internal BAF, tidak bisa diakses dari GitHub-hosted runner')
  test.describe.configure({ timeout: 90000 })

  let screenshotPaths: string[] = []
  let testStart: Date

  // helper screenshot, nama file otomatis diprefix judul test biar nggak bentrok
  async function capture(page: Page, testInfo: TestInfo, name: string) {
    const slug = testInfo.title.replace(/\s+/g, '-')
    const path = `test-results/test-screenshot/${slug}/${name}.png`
    await page.screenshot({ path })
    screenshotPaths.push(path)
  }

  test.beforeEach(async ({ page }, testInfo) => {
    screenshotPaths = []
    testStart = new Date()

    await loginSandia(page)
    await pilihMenuSandia(page, 'CANDICE')

    const objProductPPOB = page.getByRole('link', { name: 'Master Product PPOB' })
    await objProductPPOB.scrollIntoViewIfNeeded()
    await expect(objProductPPOB).toBeVisible()
    await objProductPPOB.click()

    await expect(page.locator('strong:has-text("Master Product PPOB")')).toBeVisible()
    await capture(page, testInfo, 'Masuk-Ke-Master-Product-PPOB')
  })

  test.afterEach(async ({}, testInfo) => {
    await combineScreenshotsToPdf(
      screenshotPaths,
      `test-results/report/${testInfo.title.replace(/\s+/g, '-')}.pdf`,
      {
        testName: testInfo.title,
        status: testInfo.status ?? 'unknown',
        startTime: testStart,
        environment: 'UAT',
      }
    )
  })

  test('Product PPOB Status Active Category Listrik', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Listrik'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()
    await objCategory.pressSequentially(category, { delay: 50 })
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')


  })

  test('Product PPOB Status Active Category Paket Data', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Paket Data'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()
    await objCategory.pressSequentially(category, { delay: 50 })
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')    
  })

  test('Product PPOB Status Active Category Paket Data Telkomsel', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Paket Data Telkomsel'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()
    await objCategory.pressSequentially(category, { delay: 50 })
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')    
  })

  test('Product PPOB Status Active Category Paket Data XL', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Paket Data XL'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()
    await objCategory.pressSequentially(category, { delay: 50 })
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')    
  })

  test('Product PPOB Status Active Category Pulsa', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Pulsa'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()  
    await objCategory.pressSequentially(category, { delay: 50 })
    await page.waitForTimeout(2000)
    await page.click('#react-select-3-option-4')
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')    
  })

  test('Product PPOB Status Active Category Pulsa 32', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Pulsa 32'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()  
    await objCategory.pressSequentially(category, { delay: 50 })
    await page.waitForTimeout(2000)
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')    
  })

  test('Product PPOB Status Active Category Pulsa 34', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Pulsa 34'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()  
    await objCategory.pressSequentially(category, { delay: 50 })
    await page.waitForTimeout(2000)
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')    
  })

  test('Product PPOB Status Active Category Token Listrik', async ({ page }, testInfo) => {

    'select partner Code'
    const partnerCode = 'AYOCONNECT'
    const objPartnerCode = page.locator('#react-select-2-input')
    await expect(objPartnerCode).toBeVisible()
    await objPartnerCode.pressSequentially(partnerCode, { delay: 50 })
    await objPartnerCode.press('ArrowDown')
    await objPartnerCode.press('Enter')
    await capture(page, testInfo, 'Select-Partner-Code')

   'select Category'
    const category = 'Token Listrik'
    const objCategory = page.locator('#react-select-3-input')
    await expect(objCategory).toBeVisible()  
    await objCategory.pressSequentially(category, { delay: 50 })
    await page.waitForTimeout(2000)
    await objCategory.press('ArrowDown')
    await objCategory.press('Enter')
    await capture(page, testInfo, 'Select-Category')

    'select Status'
    const status = 'Active'
    const objStatus = page.locator('#react-select-4-input')
    await expect(objStatus).toBeVisible()
    await objStatus.pressSequentially(status, { delay: 50 })
    await objStatus.press('ArrowDown')
    await objStatus.press('Enter')
    await capture(page, testInfo, 'Select-Status')

    'Filter'
    const objFilter = page.getByRole('button', { name: 'Filter' })
    const objTextCandice = page.locator('span:has-text("CANDICE")')
    await expect(objFilter).toBeVisible()
    await objFilter.click()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'klik-Filter')

    await objTextCandice.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await capture(page, testInfo, 'Hasil-Filter')    
  })


})









