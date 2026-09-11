import { expect, test } from "@playwright/test";
import { combineScreenshotsToPdf } from "./ScreenshotsToPdf";
import { loginOPEX } from './loginOPEX';


test('Pengaturan Dana',async ({ page }) => {

test.skip(!!process.env.CI, 'Domain internal BAF, tidak bisa diakses dari GitHub-hosted runner')

 test.setTimeout(90000)
const screenshotPaths: string[] = []

'login OPEX'
await loginOPEX(page);

'klik pengatuaran dana opex'
const objPenggunakanOPEX =  page.getByText('Pengaturan Dana OPEX', { exact: true })
await expect(objPenggunakanOPEX).toBeVisible()
await objPenggunakanOPEX.click()

'validasi page'
const TextPengaturanDana =  page.locator('div').filter({ hasText: 'Pengaturan Dana OPEX' }).first()
await expect(TextPengaturanDana).toBeVisible
let shot = 'test-results/step-screenshots/validasiPage-Pengaturan-Dana.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

'klik search'
const objSearch = page.locator('button:has-text("Search")')
await page.waitForTimeout(2000)
await expect(objSearch).toBeVisible()
await objSearch.click()
shot = 'test-results/step-screenshots/klik-search.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

'input list data network'
const kodeNuklir = '165'
const objInputDataNetwork = page.locator("//div[contains(@class,'modal-body')]//div//input[contains(@placeholder,'Input keyword')]")
await expect(objInputDataNetwork).toBeVisible()
await objInputDataNetwork.fill(kodeNuklir)

'klik pilih'
const objPilih = page.locator(`//tr[td[contains(., '1.')]]//button`)
await expect(objPilih).toBeVisible()
await objPilih.click()
shot = 'test-results/step-screenshots/pilih-area-office.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

await combineScreenshotsToPdf(screenshotPaths, 'test-results/report/Pengaturan-Dana-OPEX.pdf')


})








