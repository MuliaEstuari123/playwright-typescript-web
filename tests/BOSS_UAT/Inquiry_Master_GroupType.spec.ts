import { expect, test } from '@playwright/test';
import { combineScreenshotsToPdf } from "../Helper/ScreenshotsToPdf";
import { loginHDLmanager } from './loginHDLmanager';

const testStart = new Date()

test('Inquiry Master Group Type', async ({ page },testInfo) => {

test.setTimeout(90000)
const screenshotPaths:string[] = []

'login HDL manager'
await loginHDLmanager(page)

'menu master group type'
const objTextGroupType = page.getByText('Master Group Type', { exact : true })
await expect(objTextGroupType).toBeVisible()
await objTextGroupType.click()

'sub menu inquiry master group type'
const objtextInquiryGroupType = page.getByText('Inquiry Master Group Type', { exact:true })
await expect(objtextInquiryGroupType).toBeVisible()
await objtextInquiryGroupType.click()

'validasi page group type'
const objTextPageInquiry =  page.getByText('Inquiry Master Group', { exact: true })
await expect(objTextPageInquiry).toBeVisible()
await page.waitForTimeout(1000)
let shot = 'test-results/step-screenshots/Masuk-Inquiry-Master-Group.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'scroll down'
const objPage1 = page.locator("//li[@class='page-item active']//span[@class='page-link']")
await objPage1.scrollIntoViewIfNeeded()
await expect(objPage1).toBeVisible()
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Input Code'
const Code = '001'
const objInputCode = page.getByRole('textbox', { name:'Code' })
await expect(objInputCode).toBeVisible()
await page.waitForTimeout(2000)
await objInputCode.fill(Code)
shot = 'test-results/step-screenshots/Input-Code.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Input Tipe MC'
const TipeMC = 'YAMAHA MIO SOUL'
const objTipeMC = page.getByRole('textbox', { name:'Tipe MC' })
await expect(objTipeMC).toBeVisible()
await objTipeMC.fill(TipeMC)

'Tipe Group'
const TipeGroup = 'AUTOMATIC'
const objTipeGroup = page.getByRole('textbox', { name: 'Tipe Group' })
await expect(objTipeGroup).toBeVisible()
await objTipeGroup.fill(TipeGroup)
shot = 'test-results/step-screenshots/Input-Tipe-Group.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Filter'
const objFilter = page.getByRole('button', { name: 'Filter' })
await expect(objFilter).toBeVisible()
await objFilter.click()
await page.waitForTimeout(2000)
shot = 'test-results/step-screenshots/Berhasil-Filter.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

await combineScreenshotsToPdf(
  screenshotPaths,
  'test-results/report/Inquiry-Master-Group-Type.pdf',
  {
    testName: testInfo.title,
    status: testInfo.status ?? 'unknown',
    startTime: testStart,
    environment: 'UAT',
  }
)

});











