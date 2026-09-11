import { expect, test } from '@playwright/test';
import { loginSandia, pilihMenuSandia } from './loginSandiaProd';
import { combineScreenshotsToPdf } from "./ScreenshotsToPdf";
import { uploadFile } from './UploadFile';



test('List Order NMC', async ({ page }) => {

  test.setTimeout(90000)
  const screenshotPaths: string[] = []

  'login menu NMC'
  await loginSandia(page);
  await pilihMenuSandia(page, 'NMC');

  'klik menu'
  const objListOrderNMC = page.locator('a').filter({ hasText: 'List Order NMC' }).first()
  await expect(objListOrderNMC).toBeVisible()
  await objListOrderNMC.click()

  'klik tambah order'
  const objTambahOrder = page.getByRole('button', { name: 'Tambah Order' })
  await expect(objListOrderNMC).toBeVisible()
  await objTambahOrder.click()
  let shot = 'test-results/step-screenshots/klik-tambah-order.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'select cabang'
  const cabang = 'jakarta'
  const objCabang = page.getByRole('textbox', { name: 'Cabang' })
  await expect(objCabang).toBeVisible()
  await objCabang.pressSequentially(cabang, { delay: 50 })
  await page.waitForTimeout(500)
  await objCabang.press('ArrowDown')
  await objCabang.press('Enter')
  shot = 'test-results/step-screenshots/select-cabang.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'select Dealer'
  const dealer = 'pelangi'
  const objDealer = page.getByRole('textbox', { name: 'Dealer' })
  await expect(objDealer).toBeVisible()
  await objDealer.pressSequentially(dealer, { delay: 50 })
  await page.waitForTimeout(500)
  await objDealer.press('ArrowDown')
  await objDealer.press('Enter')
  shot = 'test-results/step-screenshots/select-dealer.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'Nama Konsumen'
  const NamaKonsumen = 'Rita Ora'
  const objNamaKonsumen = page.locator('[name="Fullname"]')
  await expect(objNamaKonsumen).toBeVisible()
  await objNamaKonsumen.fill(NamaKonsumen)
  shot = 'test-results/step-screenshots/nama-konsumen.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'NIK'
  const NIK = '3325075414880004'
  const objNIK = page.locator('[name="IdNo"]')
  await expect(objNIK).toBeVisible()
  await objNIK.fill(NIK)
  shot = 'test-results/step-screenshots/nik.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'Tempat Lahir'
  const TempatLahir = 'Melbourne'
  const objTempatLahir = page.locator('[name="TempatLahir"]')
  await expect(objTempatLahir).toBeVisible()
  await objTempatLahir.fill(TempatLahir)
  shot = 'test-results/step-screenshots/tempat-lahir.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'Tanggal Lahir'
  const tglLahir = '1983-09-01'
  const objTanggalLahir = page.locator('[name="TanggalLahir"]')
  await expect(objTanggalLahir).toBeVisible()
  await objTanggalLahir.fill(tglLahir)
  shot = 'test-results/step-screenshots/tanggal-lahir.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'Email'
  const Email = 'viqih.ayudya@baf.id'
  const objEmail = page.locator('[name="Email1"]')
  await expect(objEmail).toBeVisible()
  await objEmail.fill(Email)
  shot = 'test-results/step-screenshots/email.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'No HP 1'
  const NoHP1 = '083572194924'
  const objHP1 = page.locator('[name="Handphone1"]')
  await expect(objHP1).toBeVisible();
  await objHP1.fill(NoHP1)

  'No HP 2'
  const NoHP2 = '0877876573764'
  const objHP2 = page.locator('[name="Handphone2"]')
  await expect(objHP2).toBeVisible();
  await objHP2.fill(NoHP2)
  shot = 'test-results/step-screenshots/input-noHP.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'Alamat Tinggal'
  const Alamat = 'palm jumeirah'
  const objAlamat = page.locator('[name="KTPAlamat"]')
  await expect(objHP2).toBeVisible();
  await objAlamat.fill(Alamat)

  'RT'
  const RT = '085'
  const objRT = page.locator('[name="KTPRT"]')
  await expect(objRT).toBeVisible();
  await objRT.fill(RT)

  'RW'
  const RW = '085'
  const objRW = page.locator('[name="KTPRW"]')
  await expect(objRW).toBeVisible();
  await objRW.fill(RW)

  'Provinsi'
  const Provinsi = 'Jakarta'
  const objProvinsi = page.getByRole('textbox', { name: 'Provinsi' })
  await expect(objProvinsi).toBeVisible();
  await objProvinsi.pressSequentially(Provinsi,{ delay : 50 })
  await page.waitForTimeout(500)
  await objProvinsi.press('ArrowDown')
  await objProvinsi.press('Enter')
  shot = 'test-results/step-screenshots/select-provinsi.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

  'Kota'
  const Kota = 'Jakarta Selatan'
  const objKota = page.getByRole('textbox', { name: 'Kota/Kabupaten' })
  await expect(objKota).toBeVisible()
  await objKota.pressSequentially(Kota, { delay: 50 })
  await page.waitForTimeout(500)
  await objKota.press('ArrowDown')
  await objKota.press('Enter')

  'kecamatan'
  const kecamatan = 'Cilandak'
  const objKecamatan = page.getByRole('textbox', { name: 'Kecamatan' })
  await expect(objKecamatan).toBeVisible()
  await objKecamatan.pressSequentially(kecamatan, { delay: 50 })
  await page.waitForTimeout(500)
  await objKecamatan.press('ArrowDown')
  await objKecamatan.press('Enter')
  shot = 'test-results/step-screenshots/input-kecamatan.png'
  await page.screenshot({ path: shot })
  screenshotPaths.push(shot)

'kelurahan'
const kelurahan = 'cilandak barat'
const objKelurahan = page.getByRole('textbox', { name : 'Kelurahan/Desa' })
await expect(objKelurahan).toBeVisible()
await objKelurahan.pressSequentially(kelurahan,{ delay : 50 })
await page.waitForTimeout(500)
await objKelurahan.press('ArrowDown')
await objKelurahan.press('Enter')
shot = 'test-results/step-screenshots/input-kelurahan.png'  
await page.screenshot( { path: shot })
screenshotPaths.push(shot)

'status pernikahan'
const pernikahan = 'Single'
const objPernikahan = page.getByRole('textbox', { name :'Status Pernikahan' })
await expect(objPernikahan).toBeVisible()
await objPernikahan.pressSequentially(pernikahan, { delay : 50 })
await page.waitForTimeout(500)
await objPernikahan.press('ArrowDown')
await objPernikahan.press('Enter')

'ada penjamin'
const penjamin = 'tidak'
const objPenjamin = page.getByRole('textbox', { name : 'Ada Penjamin' })
await expect(objPenjamin).toBeVisible()
await objPenjamin.pressSequentially(penjamin, { delay : 50 })
await page.waitForTimeout(500)
await objPenjamin.press('ArrowDown')
await objPenjamin.press('Enter')

'Series Motor'
const SeriesMotor = 'YAMAHA.NMAX'
const objSeriesMotor = page.getByRole('textbox', { name : 'Series Motor' })
await expect(objSeriesMotor).toBeVisible()
await objSeriesMotor.pressSequentially(SeriesMotor,{ delay : 50 })
await page.waitForTimeout(500)
await objSeriesMotor.press('ArrowDown')
await objSeriesMotor.press('Enter')

'tipe motor'
const TipeMotor = 'YAMAHA.NMAX.NON ABS'
const objTipeMotor = page.getByRole('textbox',{ name : 'Tipe Motor' })
await expect(objTipeMotor).toBeVisible()
await page.waitForTimeout(500)
await objTipeMotor.pressSequentially(TipeMotor,{  delay : 50 })
await objTipeMotor.press('ArrowDown')
await objTipeMotor.press('Enter')

'Tahun Motor'
const TahunMotor = '2024'
const objTahunMotor = page.getByRole('textbox', { name : 'Tahun Motor' })
await expect(objTahunMotor).toBeVisible()
await objTahunMotor.pressSequentially(TahunMotor,{ delay : 50 })
await page.waitForTimeout(500)
await objTahunMotor.press('ArrowDown')
await objTahunMotor.press('Enter')
shot = 'test-results/step-screenshots/input-tahun-motor.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Unit Ready'
const UnitReady = 'YA'
const objUnitReady = page.getByRole('textbox', { name: 'Unit Ready?' })
await expect(objUnitReady).toBeVisible()
await objUnitReady.pressSequentially(UnitReady, { delay:50 })
await page.waitForTimeout(500)
await objUnitReady.press('ArrowDown')
await objUnitReady.press('Enter')
shot = 'test-results/step-screenshots/select-unit-ready.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Harga OTR'
const HargaOTR = '30000000'
const objHargaOTR = page.locator('[name="HargaBarang"]')
await expect(objHargaOTR).toBeVisible()
await objHargaOTR.fill(HargaOTR)

'Uang Muka/DP'
const DP = '12000000'
const objDP = page.locator('[name="DP"]')
await page.waitForTimeout(500)
await expect(objDP).toBeVisible()
await objDP.fill(DP)

'Tenor'
const Tenor = '24'
const objTenor = page.locator('[name="Tenor"]')
await expect(objTenor).toBeVisible()
await objTenor.fill(Tenor)
shot = 'test-results/step-screenshots/input-Tenor.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Angsuran'
const Angsuran = '1700000'
const objAngsuran = page.locator('[name="Angsuran"]')
await expect(objAngsuran).toBeVisible()
await objAngsuran.fill(Angsuran)

'Tanggal & Jam Survey'
const objTanggalJam = page.locator('text=Req Jam Survey').locator('xpath=following::input[1]')

const besok = new Date()
besok.setDate(besok.getDate() + 1)
const mm = String(besok.getMonth() + 1).padStart(2, '0')
const dd = String(besok.getDate()).padStart(2, '0')
const yyyy = besok.getFullYear()
const tanggalBesok = `${yyyy}/${mm}/${dd}`

console.log('Tanggal yang akan diisi:', tanggalBesok)

await expect(objTanggalJam).toBeVisible()
await objTanggalJam.click()
await objTanggalJam.fill(tanggalBesok)
await page.waitForTimeout(500)

await page.locator('td.rdtTimeToggle').click()

const targetJam = 21
for (let i = 0; i < targetJam; i++) {
  await page.locator('.rdtCounter').nth(0).locator('.rdtBtn').first().click()
  await page.waitForTimeout(100)
}

await page.locator('body').click({ position: { x: 10, y: 10 } })
await page.waitForTimeout(300)

shot = 'test-results/step-screenshots/tanggal-jam-survey.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Sumber Aplikasi'
const SumberAplikasi = 'BAF Employee'
const objSumberAplikasi = page.getByRole('textbox', { name : 'Sumber Aplikasi' })
await expect(objSumberAplikasi).toBeVisible()
await objSumberAplikasi.pressSequentially(SumberAplikasi,{ delay : 50 })
await page.waitForTimeout(500)
await objSumberAplikasi.press('ArrowDown')
await objSumberAplikasi.press('Enter')





  // gabungin semua screenshot jadi 1 PDF di akhir test
  await combineScreenshotsToPdf(screenshotPaths, 'test-results/report/list-order-nmc-report.pdf')
});