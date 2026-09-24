import { expect,test } from "@playwright/test";
import { loginHDLmanager } from "./loginHDLmanager";
import { combineScreenshotsToPdf } from "../Helper/ScreenshotsToPdf";

const testStart = new Date()


test('Inquiry Master Tiering', async ({ page },testInfo) => {

test.setTimeout(90000)
const screenshotPaths:string[]=[]

'login HDL manager'
await loginHDLmanager(page)

'menu Master Setting Tiering'
const objMasterTiering = page.getByText('Master Setting Tiering', { exact:true })
await expect(objMasterTiering).toBeVisible()
await objMasterTiering.click()

'Inquiry Master Tiering'
const objInquiryTiering = page.getByText('Inquiry Master Tiering', { exact:true })
await expect(objInquiryTiering).toBeVisible()
await objInquiryTiering.click()

'validasi page'
const objTextTiering =  page.locator('span:has-text("Master Setting Tiering")')
await expect(objTextTiering).toBeVisible()
let shot = 'test-results/step-screenshots/Masuk-Inquiry-Master-Tiering.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'scroll down'
const objPage1 = page.locator("//li[@class='page-item active']//span[@class='page-link']")
await objPage1.scrollIntoViewIfNeeded()
await expect(objPage1).toBeVisible()
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Input Keyword'
const Keyword = '160'
const objKeyword =  page.getByRole('textbox', { name: 'Input keyword' })
await expect(objKeyword).toBeVisible()
await objKeyword.pressSequentially(Keyword, { delay:50 })
await page.waitForTimeout(3000)
shot = 'test-results/step-screenshots/Input-Keyword.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

await combineScreenshotsToPdf(
  screenshotPaths,
  'test-results/report/Inquiry-Master-Tiering.pdf',
  {
    testName: testInfo.title,
    status: testInfo.status ?? 'unknown',
    startTime: testStart,
    environment: 'UAT',
  }
)



});





