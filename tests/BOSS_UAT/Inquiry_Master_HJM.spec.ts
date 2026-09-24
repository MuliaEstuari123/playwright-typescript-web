
import { expect, test } from "@playwright/test";
import { loginHDLmanager } from "./loginHDLmanager";
import { combineScreenshotsToPdf } from "../Helper/ScreenshotsToPdf";

const testStart = new Date()

test('Inquiry', async ({ page },testInfo) => {

test.setTimeout(90000)
const  screenshotPaths:string[] = []

'login HDL manager'
await loginHDLmanager(page)

'menu Master Setting HJM'
const objMasterHJM = page.getByText('Master Setting HJM', { exact:true })
await expect(objMasterHJM).toBeVisible()
await objMasterHJM.click()

'submenu inquiry master HJM'
const objInquiryHJM = page.getByText('Inquiry Master HJM', { exact:true })
await expect(objInquiryHJM).toBeVisible()
await objInquiryHJM.click()

'validasi inquiry master HJM'
const objTextPageInquiryHJM =  page.getByText('Inquiry Master HJM', { exact: true })
await expect(objTextPageInquiryHJM).toBeVisible()
await page.waitForTimeout(1000)
let shot = 'test-results/step-screenshots/Masuk-Inquiry-Master-HJM.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'scroll down'
const objArrow = page.locator('ul.pagination.pagination-sm').locator('li').nth(0)
await objArrow.scrollIntoViewIfNeeded()
await expect(objArrow).toBeVisible()
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)
  

'Tipe Group'
const TipeGroup = 'YAMAHA.NMAX'
const objTipeGroup = page.getByRole('textbox',{ name:'Tipe Group'})
await expect(objTipeGroup).toBeVisible()
await objTipeGroup.fill(TipeGroup)

// 'Terbentuk'
// const TipeTerbentuk = '20000000'
// const objTipeTerbentuk = page.getByRole('textbox',{ name:'Terbentuk'})
// await expect(objTipeTerbentuk).toBeVisible()
// await objTipeTerbentuk.fill(TipeTerbentuk)
// shot = 'test-results/step-screenshots/input-terbentuk.png'
// await page.screenshot({ path: shot })
// screenshotPaths.push(shot)

'Code'
const Code = 'HJM-11202'
const objCode = page.getByRole('textbox',{ name:'Code'})
await expect(objCode).toBeVisible()
await objCode.fill(Code)

// 'RC'
// const RC = 'BANDUNG'
// const objRC =  page.getByRole('textbox', { name: 'RC' })
// await expect(objRC).toBeVisible()
// await objRC.fill(RC)
// shot = 'test-results/step-screenshots/input-RC.png'
// await page.screenshot({ path: shot })
// screenshotPaths.push(shot)

// 'AO'
// const AO = 'BANDUNG'
// const objAO =  page.getByLabel('AO', { exact: true })
// await expect(objAO).toBeVisible()
// await objAO.fill(AO)
// shot = 'test-results/step-screenshots/input-AO.png'
// await page.screenshot({ path: shot })
// screenshotPaths.push(shot)

// 'AO/Kantor'
// const AOKantor = 'BANDUNG'
// const objAOKantor =  page.getByRole('textbox', { name: 'AO/Kantor' })
// await expect(objAOKantor).toBeVisible()
// await objAOKantor.fill(AOKantor)

// 'Tahun MC'
// const objTahunMC = page.getByRole('textbox', { name: 'Tahun MC' })
// const objTahun = page.getByRole('button', { name: '2022' })
// await expect(objTahunMC).toBeVisible()
// await objTahunMC.click()
// await expect(objTahun).toBeVisible()
// shot = 'test-results/step-screenshots/input-Tahun.png'
// await page.screenshot({ path: shot })
// screenshotPaths.push(shot)
// await objTahun.click()

// 'Grade'
// const Grade = 'A'
// const objGrade =  page.getByRole('textbox', { name: 'Grade' })
// await expect(objGrade).toBeVisible()
// await objGrade.fill(Grade)

// 'Effectivbe Date'
// const Date = '2026-04-09'
// const objEffectiveDate = page.locator('#effectiveDate')
// await expect(objEffectiveDate).toBeVisible()
// await objEffectiveDate.fill(Date)

'Filter'
const objFilter = page.getByRole('button',{ name :'Filter' })
await expect(objFilter).toBeVisible()
await objFilter.click()

'Cek apakah error muncul'
const objErrorModal = page.locator('#swal2-html-container')
const isErrorVisible = await objErrorModal.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false)

if (isErrorVisible) {
  const errorMessage = await objErrorModal.textContent()
  
  shot = 'test-results/step-screenshots/Error-Filter.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)
  
  await page.getByRole('button', { name: 'OK' }).click()
  throw new Error(`Filter gagal: ${errorMessage}`)

} else {

'scroll down'
const objPage1 = page.locator("//li[@class='page-item active']//span[@class='page-link']")
await objPage1.scrollIntoViewIfNeeded()
await expect(objPage1).toBeVisible()
shot = 'test-results/step-screenshots/Table-Tampil.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)
  

}

await combineScreenshotsToPdf(
  screenshotPaths,
  'test-results/report/Inquiry-Master-Group-HJM.pdf',
  {
    testName: testInfo.title,
    status: testInfo.status ?? 'unknown',
    startTime: testStart,
    environment: 'UAT',
  }
)


})





