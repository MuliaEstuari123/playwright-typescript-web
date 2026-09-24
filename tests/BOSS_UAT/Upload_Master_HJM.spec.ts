import { expect, test } from "@playwright/test";
import { loginHDLmanager } from "./loginHDLmanager";
import { combineScreenshotsToPdf } from "../Helper/ScreenshotsToPdf";
import { ok } from "assert";
import { uploadFile } from "../Helper/UploadFile";

const testStart = new Date()

test('Upload Master HJM', async ({ page },testInfo) => {

test.setTimeout(90000)
const screenshotPaths:string[]=[]

'login HDL manager'
await loginHDLmanager(page)

'menu Master Setting HJM'
const objMasterHJM = page.getByText('Master Setting HJM', { exact:true })
await expect(objMasterHJM).toBeVisible()
await objMasterHJM.click()

'Upload Master HJM'
const objUploadMaster = page.getByText('Upload Master HJM', { exact:true })
await expect(objUploadMaster).toBeVisible()
await objUploadMaster.click()

'Pop Up Konfirmasi'
const objiconI = page.getByText('i', { exact: true })
const objOK = page.getByRole('button',{ name:'OK' })

if (await objiconI.waitFor({ state: 'visible',timeout:3000 }).then(()=>true, ()=>false)) {
await expect(objOK).toBeVisible()
await objOK.click()

await page.waitForTimeout(1000)
let shot = 'test-results/step-screenshots/Masuk-Upload-Master-HJM.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)


} else {

'validasi page'
const objPageUploadMaster = page.locator('#root')
await expect(objPageUploadMaster).toBeVisible()
await page.waitForTimeout(1000)
let shot = 'test-results/step-screenshots/Masuk-Upload-Master-HJM.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

}

'Upload File HJM'
const objFileMaster = page.locator('input[type="file"]')
await uploadFile(page, objFileMaster, 'Template-Upload-Master-HJM.xlsx')

'Validasi Upload Berhasil'
const objHeadingBerhasil = page.getByRole('heading', { name: 'Validasi Berhasil' })
const objYaMengerti = page.getByRole('button', { name: 'Ya, Saya Mengerti' })
await expect(objHeadingBerhasil).toBeVisible()
let shot = 'test-results/step-screenshots/Masuk-Upload-Master-HJM.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)
await expect(objYaMengerti).toBeVisible()
await objYaMengerti.click()

'scroll down'
const objPage1 = page.locator("//li[@class='page-item active']//span[@class='page-link']")
await objPage1.scrollIntoViewIfNeeded()
await expect(objPage1).toBeVisible()
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)


await combineScreenshotsToPdf(
  screenshotPaths,
  'test-results/report/Upload-Master-HJM.pdf',
  {
    testName: testInfo.title,
    status: testInfo.status ?? 'unknown',
    startTime: testStart,
    environment: 'UAT',
  }
)


    
})


