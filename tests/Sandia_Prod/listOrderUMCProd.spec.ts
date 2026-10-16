import { test,expect } from '@playwright/test'
import { combineScreenshotsToPdf } from '../Helper/ScreenshotsToPdf';
import { loginSandiaPreProd,pilihMenuSandia } from './loginSandiaProd';
import { uploadFile } from '../Helper/UploadFile';
import { NoHP,Email,NIK } from './GlobalDataSandiaPreProd';
import { error } from "console";

const testStart = new Date()

test('List Order UMC', async ({ page },testInfo) => {

test.skip(!!process.env.CI, 'Domain internal BAF, tidak bisa diakses dari GitHub-hosted runner')

test.setTimeout(90000)
const screenshotPaths: string[] = []

'login menu UMC'
await loginSandiaPreProd(page)
await pilihMenuSandia(page,'UMC')

'klik menu'
const objListOrderUMC = page.getByRole('link', { name:'List Order UMC' })
await page.waitForTimeout(2000)
await expect(objListOrderUMC).toBeVisible()
await objListOrderUMC.click()

'validasi page'
const objTextListDataOrder = page.getByText('LIST DATA ORDER', { exact:true })
await expect(objTextListDataOrder).toBeVisible()
await page.waitForTimeout(500)
let shot = 'test-results/step-screenshot/klik-menu-list-order-UMC.png'
await page.screenshot({ path:shot })
screenshotPaths.push(shot)

'klik tambah order'
const objTambahOrder = page.getByRole('link', { name: 'Tambah Order' })
await expect(objTambahOrder).toBeVisible()
await objTambahOrder.click()

'validasi page'
const objTextInputDataAwal = page.getByText('INPUT DATA AWAL', { exact:true })
await expect(objTextInputDataAwal).toBeVisible()
await page.waitForTimeout(500)
shot = 'test-results/step-screenshot/Masuk-ke-menu-UMC.png'
await page.screenshot({ path:shot })
screenshotPaths.push(shot)

'select cabang'
const cabang = '165'
const objCabang = page.locator('#react-select-3-input')
await expect(objCabang).toBeVisible()
await objCabang.pressSequentially(cabang, { delay: 50 })
await page.waitForTimeout(500)
await objCabang.press('ArrowDown')
await objCabang.press('Enter')
shot = 'test-results/step-screenshots/select-cabang.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'select Dealer'
const dealer = 'UTAN JATI'
const objDealer = page.getByRole('textbox', { name: 'Dealer' })
await expect(objDealer).toBeVisible()
await objDealer.pressSequentially(dealer, { delay: 50 })
await page.waitForTimeout(1000)
await objDealer.press('ArrowDown')
await objDealer.press('Enter')
shot = 'test-results/step-screenshots/select-dealer.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Nama Konsumen'
const randomStr = Array.from({ length: 4 }, () =>
String.fromCharCode(97 + Math.floor(Math.random() * 26))
).join('')
const NamaKonsumen = `Nazla ${randomStr}`
const objNamaKonsumen = page.locator('[name="Fullname"]')
await expect(objNamaKonsumen).toBeVisible()
await objNamaKonsumen.fill(NamaKonsumen)
shot = 'test-results/step-screenshots/nama-konsumen.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'NIK'
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
const objEmail = page.locator('[name="Email1"]')
await expect(objEmail).toBeVisible()
await objEmail.fill(Email)
shot = 'test-results/step-screenshots/email.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'No HP 1'
const objHP1 = page.locator('[name="Handphone1"]')
await expect(objHP1).toBeVisible();
await objHP1.fill(NoHP)

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
const objAlamat = page.locator('[name="Address"]')
await expect(objAlamat).toBeVisible();
await objAlamat.fill(Alamat)

'RT'
const RT = '004'
const objRT = page.locator('[name ="RT"]')
await expect(objRT).toBeVisible()
await objRT.fill(RT)

'RW'
const RW = '003'
const objRW = page.locator('[name="RW"]')
await expect(objRW).toBeVisible()
await objRW.fill(RW)
shot = 'test-results/step-screenshots/input-RW.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Provinsi'
const provinsi = 'DKI JAKARTA'
const objProvinsi = page.locator('#react-select-6-input')
await expect(objProvinsi).toBeVisible()
await objProvinsi.pressSequentially(provinsi,{ delay:50 })
await page.waitForTimeout(500)
await objProvinsi.press('ArrowDown')
await objProvinsi.press('Enter')
shot = 'test-results/step-screenshots/input-Provinsi.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Kota'
const Kota = 'Jakarta Selatan'
const objKota = page.locator('#react-select-7-input')
await expect(objKota).toBeVisible()
await objKota.pressSequentially(Kota, { delay: 50 })
await page.waitForTimeout(500)
await objKota.press('ArrowDown')
await page.waitForTimeout(500)
await objKota.press('Enter')

'kecamatan'
const kecamatan = 'Cilandak'
const objKecamatan = page.locator('#react-select-8-input')
await expect(objKecamatan).toBeVisible()
await objKecamatan.pressSequentially(kecamatan, { delay: 50 })
await page.waitForTimeout(500)
await objKecamatan.press('ArrowDown')
await page.waitForTimeout(500)
await objKecamatan.press('Enter')
shot = 'test-results/step-screenshots/input-kecamatan.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'kelurahan'
const kelurahan = 'cilandak barat'
const objKelurahan = page.locator('#react-select-9-input')
await expect(objKelurahan).toBeVisible()
await objKelurahan.pressSequentially(kelurahan,{ delay : 50 })
await page.waitForTimeout(500)
await objKelurahan.press('ArrowDown')
await page.waitForTimeout(500)
await objKelurahan.press('Enter')
shot = 'test-results/step-screenshots/input-kelurahan.png'  
await page.screenshot( { path: shot })
screenshotPaths.push(shot)

'Merk'
const Merk = 'HONDA'
const objMerk = page.locator('#react-select-10-input')
await expect(objMerk).toBeVisible()
await objMerk.pressSequentially(Merk,{ delay:50 })
await page.waitForTimeout(500)
await objMerk.press('ArrowDown')
await objMerk.press('Enter')

'Series Motor'
const SeriesMotor = 'N.HND.MTR VARIO'
const objSeriesMotor = page.locator('#react-select-11-input')
await expect(objSeriesMotor).toBeVisible()
await objSeriesMotor.pressSequentially(SeriesMotor,{ delay : 50 })
await page.waitForTimeout(500)
await objSeriesMotor.press('ArrowDown')
await objSeriesMotor.press('Enter')

'tipe motor'
const TipeMotor = 'HONDA VARIO 125 CBS ISS'
const objTipeMotor = page.locator('#react-select-12-input')
await expect(objTipeMotor).toBeVisible()
await page.waitForTimeout(500)
await objTipeMotor.pressSequentially(TipeMotor,{  delay : 50 })
await objTipeMotor.press('ArrowDown')
await objTipeMotor.press('Enter')

'Tahun Motor'
const TahunMotor = '2020'
const objTahunMotor = page.locator('#react-select-13-input')
await expect(objTahunMotor).toBeVisible()
await objTahunMotor.pressSequentially(TahunMotor,{ delay : 50 })
await page.waitForTimeout(2000)
await objTahunMotor.press('ArrowDown')
await objTahunMotor.press('Enter')
shot = 'test-results/step-screenshots/input-tahun-motor.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Harga Barang'
const HargaBarang = '19000000'
const objHargaBarang = page.locator('[name="HargaBarang"]')
await expect(objHargaBarang).toBeVisible()
await objHargaBarang.fill(HargaBarang)

'Faktur'
const Faktur = 'YA'
const objFaktur = await page.locator('#react-select-14-input')
await expect(objFaktur).toBeVisible()
await objFaktur.pressSequentially(Faktur, { delay:50 })
await page.waitForTimeout(500)
await objFaktur.press('ArrowDown')
await objFaktur.press('Enter')

'Cover Area'
const CoverArea = 'YA'
const objCoverArea = page.locator('#react-select-15-input')
await expect(objCoverArea).toBeVisible()
await objCoverArea.pressSequentially(CoverArea, { delay:50 })
await page.waitForTimeout(500)
await objCoverArea.press('ArrowDown')
await objCoverArea.press('Enter')

'Uang Muka'
const uangMuka = '8000000'
const objUangMuka = page.locator('[name="DP"]')
await expect(objUangMuka).toBeVisible()
await objUangMuka.fill(uangMuka)
shot = 'test-results/test-screenshot/Input-Uang-Muka.png'
await page.screenshot({ path:shot })
screenshotPaths.push(shot)

'Tenor'
const Tenor = '11'
const objTenor = page.locator('[name="Tenor"]')
await expect(objTenor).toBeVisible()
await objTenor.pressSequentially(Tenor, { delay:50 })
await page.waitForTimeout(500)
await objTenor.press('ArrowDown')
await objTenor.press('Enter')

'Calculate'
const objCalculate = page.getByRole('button', { name:'Calculate' })
await expect(objCalculate).toBeVisible()
await objCalculate.click()

'validasi success'
const objTextDataHarga = page.getByText('Data Harga Ditemukan', { exact: true })
const objOK = page.getByRole('button', { name: 'OK' })

if (await objTextDataHarga.waitFor({ timeout:5000 }).then(()=> true).catch(()=> false)) {

    shot = 'test-results/step-screenshots/Succes-get-harga.png'
    await page.screenshot({ path: shot })
    screenshotPaths.push(shot)
    await objOK.click()

} else {

    shot = 'test-results/step-screenshots/Failed-Calculate.png'
    await page.screenshot({ path: shot })    
    screenshotPaths.push(shot)

    throw new error('gagal get harga')


}






  await combineScreenshotsToPdf(
      screenshotPaths,
      'test-results/report/List-Order-UMC.pdf',
      {
        testName: testInfo.title,
        status: testInfo.status ?? 'unknown',
        startTime: testStart,
        environment: 'PreProd',
      }
    )









});



