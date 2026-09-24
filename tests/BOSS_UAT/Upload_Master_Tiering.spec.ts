import { expect,test } from "@playwright/test";
import { loginHDLmanager } from "./loginHDLmanager";
import { combineScreenshotsToPdf } from "../Helper/ScreenshotsToPdf";
import { uploadFile } from "../Helper/UploadFile";

const testStart = new Date()

test('Upload Master Tiering', async ({ page },testInfo) => {

test.setTimeout(90000)
const screenshotPaths:string[]=[]

'login HDL'
await loginHDLmanager(page)

'menu Master Setting Tiering'
const objMasterTiering = page.getByText('Master Setting Tiering', { exact:true })
await expect(objMasterTiering).toBeVisible()
await objMasterTiering.click()

'menu Upload Master Tiering'
const objUploadTiering = page.getByText('Upload Master Tiering', { exact:true })
await expect(objUploadTiering).toBeVisible()
await objUploadTiering.click()

'validasi page'
const objTextUploadTiering =  page.getByText('Upload Master Setting Tiering', { exact: true })
await expect(objTextUploadTiering).toBeVisible()
let shot = 'test-results/step-screenshots/Masuk-Upload-Master-Tiering.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Upload File Tiering'
const objFileMaster = page.locator('input[type="file"]')
await uploadFile(page, objFileMaster, 'template-tiering-setting.xlsx')
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/Masuk-Upload-Master-Tiering.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'scroll down'
const objPage1 = page.locator("//li[@class='page-item active']//span[@class='page-link']")
await objPage1.scrollIntoViewIfNeeded()
await expect(objPage1).toBeVisible()
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'klik submit'
const objSubmit = page.getByRole('button', { name:'Submit' })
await expect(objSubmit).toBeVisible()
await objSubmit.click()

'pop up konfirmasi'
const objIconWarning = page.getByText('!', { exact: true })
let objOK = page.getByRole('button',{ name:'OK' })
await expect(objIconWarning).toBeVisible()
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)
await objOK.click()

'Validasi Success'
const objHeadingSuccess = page.getByRole('heading', { name: 'Success' })
await expect(objHeadingSuccess).toBeVisible()
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/Berhasil-Submit.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)
await objOK.click()

await combineScreenshotsToPdf(
  screenshotPaths,
  'test-results/report/Upload-Master-Tiering.pdf',
  {
    testName: testInfo.title,
    status: testInfo.status ?? 'unknown',
    startTime: testStart,
    environment: 'UAT',
  }
)



})