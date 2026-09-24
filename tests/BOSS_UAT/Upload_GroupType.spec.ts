import { expect, test } from "@playwright/test";
import { combineScreenshotsToPdf } from "../Helper/ScreenshotsToPdf";
import { loginHDLmanager } from "./loginHDLmanager";
import { uploadFile } from "../Helper/UploadFile";

const testStart = new Date()

test('Upload Group Type', async ({ page },testInfo) => {

test.setTimeout(90000)
const screenshotPaths:string[] = []

'login hdl manager'
await loginHDLmanager(page)

'menu master group type'
const objTextGroupType = page.getByText('Master Group Type', { exact : true })
await expect(objTextGroupType).toBeVisible()
await objTextGroupType.click()

'Upload Group Type'
const objTextUploadGroupType = page.getByText('Upload Group Type', { exact : true })
await expect(objTextUploadGroupType).toBeVisible()
await objTextUploadGroupType.click()

'validasi page upload master group'
const objTextPageUpload =  page.getByText('Upload Master Group', { exact: true })
await expect(objTextPageUpload).toBeVisible()
await objTextPageUpload.click()
let shot = 'test-results/step-screenshots/Upload-Master-Group.png'
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

'Upload File'
const objFileMaster = page.locator('input[type="file"]')
await uploadFile(page, objFileMaster, 'baf-hdl-upload_master_group_template.xlsx')

'validasi upload berhasil'
const objHeadingBerhasil = page.getByRole('heading',{ name :'Berhasil' })
await expect(objHeadingBerhasil).toBeVisible()
shot = 'test-results/step-screenshots/UploadFile-Berhasil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'klik tutup'
const objTutup = page.getByRole('button', { name:'Tutup' })
await expect(objTutup).toBeVisible()
await objTutup.click()
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/Data-Berhasil-Muncul.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'scroll down'
const objPage1 = page.locator("//li[@class='page-item active']//span[@class='page-link']")
await objPage1.scrollIntoViewIfNeeded()
await expect(objPage1).toBeVisible()
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'minimize chat dea'
const objArrowChatDea = page.getByRole('button', { name: '>' })
await expect(objArrowChatDea).toBeVisible()
await objArrowChatDea.click()

'klik Submit'
const objSubmit = page.getByRole('button', { name:'Submit' })
await expect(objSubmit).toBeVisible()
await objSubmit.click()

'pop up konfirmasi'
const objHeadingPeringatan =  page.getByRole('heading', { name: 'Peringatan' })
const objYaSubmit = page.getByRole('button', { name: 'Ya, Submit' })
await expect(objHeadingPeringatan).toBeVisible()
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/Konfirmasi.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)
await page.waitForTimeout(1000)
await expect(objYaSubmit).toBeVisible()
await objYaSubmit.click()

'Capture success'
await page.waitForTimeout(2000)
shot = 'test-results/step-screenshots/Berhasil-Submit.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)


await combineScreenshotsToPdf(
  screenshotPaths,
  'test-results/report/Upload-Master-Group-Type.pdf',
  {
    testName: testInfo.title,
    status: testInfo.status ?? 'unknown',
    startTime: testStart,
    environment: 'UAT',
  }
)



});













