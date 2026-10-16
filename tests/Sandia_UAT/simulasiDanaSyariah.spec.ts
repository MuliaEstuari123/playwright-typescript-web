
import { expect,test } from "@playwright/test";
import { combineScreenshotsToPdf } from "../Helper/ScreenshotsToPdf";
import { loginSandia,pilihMenuSandia } from "./loginSandia";
import { NoHP,NIK,Email } from "./globalDataSandiaUAT";
import { TIMEOUT } from "dns";
import { error } from "console";
import { fill } from "pdf-lib";
import { uploadFile } from "../Helper/UploadFile";

const testStart = new Date()

test('Dana Syariah Internal', async({ page },testInfo) =>{

test.skip(!!process.env.CI, 'Domain internal BAF, tidak bisa diakses dari GitHub-hosted runner')

test.setTimeout(90000)
const screenshotPaths: string[] = []

'login menu Dana Syariah Internal'
await loginSandia(page)
await pilihMenuSandia(page,'DANA SYARIAH INTERNAL')

'klik menu Simulasi'
const objSimulasi = await page.getByText('Simulasi', { exact: true })
const objTextListSimulasi = page.getByText('LIST DATA SIMULASI', { exact: true })
await expect(objSimulasi).toBeVisible()
await objSimulasi.click()

'validasi page'
await expect(objTextListSimulasi).toBeVisible()
await page.waitForTimeout(1000)
let shot = 'test-results/step-screenshots/List-Data-simulasi .png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'klik input data simulasi'
const objInputDataSimulasi = page.getByRole('button', { name: 'Input Data Simulasi' })
await expect(objInputDataSimulasi).toBeVisible()
await objInputDataSimulasi.click()
await page.waitForTimeout(500)
shot = 'test-results/step-screenshots/Masuk-ke-input-simulasi .png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'AO/Griya'
const AO_Griya = 'AREA OFFICE JAKARTA'
const objGriya = page.getByRole('textbox',{ name: 'AO/Griya' })
await expect(objGriya).toBeVisible()
await objGriya.pressSequentially(AO_Griya, { delay:50})
await page.waitForTimeout(500)
await objGriya.press('ArrowDown')
await objGriya.press('Enter')
shot = 'test-results/step-screenshots/Masuk-ke-input-simulasi .png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'NIK KTP'
const objNIK = page.locator('[name="SimNik"]')
const objCekNIK = page.getByRole('button', { name:'Cek NIK' })

await expect(objNIK).toBeVisible()
await objNIK.fill(NIK)

'Cek NIK'
await expect(objCekNIK).toBeVisible()
await objCekNIK.click()

'konfirmasi pop up'
const objHeadingInformasi = page.getByText('Informasi', { exact: true })
const objOK = page.getByRole('button',{ name:'OK' })
if (await objHeadingInformasi.waitFor({ timeout: 5000 }).then(() => true).catch(() => false)) {
  await objOK.click()
}

'Unit BAF'
const unitBAF = 'Yes'
const objUnitBAF = page.getByRole('textbox',{ name:'Unit BAF' })
await expect(objUnitBAF).toBeVisible()
await objUnitBAF.pressSequentially(unitBAF, { delay:50 })
await objUnitBAF.press('ArrowDown')
await objUnitBAF.press('Enter')
shot = 'test-results/step-screenshots/Select-Unit-BAF .png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Nama Calon Debitur'
const NamaDebitur = 'Qania zaline'
const objNamaDebitur = page.locator('[name="SimNama"]')
await expect(objNamaDebitur).toBeVisible()
await objNamaDebitur.fill(NamaDebitur)

'No HP'
const objNoHP = await page.locator('[name="SimHandphone"]')
await expect(objNoHP).toBeVisible()
await objNoHP.fill(NoHP)
shot = 'test-results/step-screenshots/Input-NoHP.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'cek akun baf mobile'
const objCekAkun = page.getByRole('button', { name: 'Cek Akun BAF Mobile' })
await expect(objCekAkun).toBeVisible()
await objCekAkun.scrollIntoViewIfNeeded()
await page.waitForTimeout(1000)
await objCekAkun.click()
await page.waitForTimeout(1000)
await objCekAkun.click()


const objTextTdkMemilikiAkun = page.getByText('Tidak memiliki akun BAF Mobile', { exact: true })

if (await objTextTdkMemilikiAkun.waitFor({ timeout:3000 }).then(() => true).catch(()=> false)) {

shot = 'test-results/step-screenshots/Tidak-Memiliki-Akun-BAFMobile.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

}

'validasi katagori konsumen'
const objTextKatagoriKonsumen = page.getByText('New Customer', { exact: true })
await expect(objTextKatagoriKonsumen).toBeVisible()

'Kepemilikan Rumah'
const KepemilikanRmh = 'Sendiri'
const objKepemilikan = page.getByRole('textbox',{ name:'Kepemilikan Rumah' })
await expect(objKepemilikan).toBeVisible()
await objKepemilikan.pressSequentially(KepemilikanRmh, { delay:50 })
await objKepemilikan.press('ArrowDown')
await objKepemilikan.press('Enter')
shot = 'test-results/step-screenshots/select-kepemilikan-konsumen.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Tipe Pencairan'
const TipePencairan = 'Transfer'
const objTipePencairan = page.getByRole('textbox', { name: 'Tipe Pencairan' })
await expect(objTipePencairan).toBeVisible()
await objTipePencairan.pressSequentially(TipePencairan,{ delay:50 })
await objTipePencairan.press('ArrowDown')
await objTipePencairan.press('Enter')

'Status Pekerjaan Debitur'
const StatusPekerjaan = 'permanent'
const objStatusPekerjaan = page.getByRole('textbox', { name: 'Status Pekerjaan Debitur' })
await expect(objStatusPekerjaan).toBeVisible()
await objStatusPekerjaan.pressSequentially(StatusPekerjaan,{ delay:50 })
await objStatusPekerjaan.press('ArrowDown')
await objStatusPekerjaan.press('Enter')

'industry Type'
const industryType = 'REAL ESTATE'
const objIndustryType = page.getByRole('textbox', { name: 'Industry Type/Kode Bidang Usaha' })
await expect(objIndustryType).toBeVisible()
await objIndustryType.pressSequentially(industryType,{ delay:50 })
await objIndustryType.press('ArrowDown')
await objIndustryType.press('Enter')
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/select-Industry-Type.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Status STNK'
const StatusSTNK = 'STNK Ada'
const objStatusSTNK = page.getByRole('textbox', { name: 'Status STNK/Pajak' })
await expect(objStatusSTNK).toBeVisible()
await objStatusSTNK.pressSequentially(StatusSTNK, { delay:50 })
await objStatusSTNK.press('ArrowDown')
await objStatusSTNK.press('Enter')

'Status Faktur'
const statusFaktur = 'ADA'
const objStatusFaktur = page.getByRole('textbox', { name: 'Status Faktur' })
await expect(objStatusFaktur).toBeVisible()
await objStatusFaktur.pressSequentially(statusFaktur, { delay:50 })
await objStatusFaktur.press('ArrowDown')
await objStatusFaktur.press('Enter')

'Kepemilikan BPKB'
const BPKB = 'SELF'
const objBPKB = page.getByRole('textbox', { name: 'Kepemilikan BPKB' })
await expect(objBPKB).toBeVisible()
await objBPKB.pressSequentially(BPKB, { delay:50 })
await objBPKB.press('ArrowDown')
await objBPKB.press('Enter')
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/select-Kepemilikan-BPKB.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Plat No Unit'
const platNoUnit = 'Dalam Kota'
const objPlatNoUnit = page.getByRole('textbox', { name: 'Plat Nomor Unit' })
await expect(objPlatNoUnit).toBeVisible()
await objPlatNoUnit.pressSequentially(platNoUnit, { delay:50 })
await objPlatNoUnit.press('ArrowDown')
await objPlatNoUnit.press('Enter')

'Brand Motor'
const brandMotor = 'YAMAHA'
const objBrandMotor = page.getByRole('textbox', { name: 'Brand Motor' })
await expect(objBrandMotor).toBeVisible()
await objBrandMotor.pressSequentially(brandMotor, { delay:50 })
await objBrandMotor.press('ArrowDown')
await objBrandMotor.press('Enter')

'Type Unit'
const typeUnit = 'YAMAHA.NMAX'
const objTypeUnit = page.getByRole('textbox', { name: 'Type Unit' })
await expect(objTypeUnit).toBeVisible()
await objTypeUnit.pressSequentially(typeUnit, { delay:50 })
await objTypeUnit.press('ArrowDown')
await objTypeUnit.press('Enter')

'Series'
const series = 'non abs n'
const objSeries = await page.getByRole('textbox', { name: 'Series' })
await expect(objSeries).toBeVisible()
await objSeries.pressSequentially(series, { delay:50 })
await objSeries.press('ArrowDown')
await objSeries.press('Enter')


'Tahun'
const tahun = '2024'
const objTahun = page.getByRole('textbox', { name: 'Tahun' })
await expect(objTahun).toBeVisible()
await objTahun.pressSequentially(tahun, { delay:50 })
await objTahun.press('ArrowDown')
await objTahun.press('Enter')
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/Input-Plat-sampai-Tahun.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Get Market Price'
const objGetMarket = page.getByRole('button', { name: 'Get Market Price' })
await expect(objGetMarket).toBeVisible()
await objGetMarket.click()

'validasi sukses get price'
const objTextSuccesGetPrice = page.getByText('Success', { exact: true })

if ( await objTextSuccesGetPrice.waitFor({ timeout:4000 }).then(() => true).catch(() => false) ) {
     
   shot = 'test-results/step-screenshots/Succes-Get-Price.png'
   await page.screenshot({ path: shot })
   screenshotPaths.push(shot)
   await objOK.click()


} else {

   shot = 'test-results/step-screenshots/Failed-Get-Price.png'
    await page.screenshot({ path: shot })    
    screenshotPaths.push(shot)

    throw new Error('Gagal get price: text "Success" tidak muncul') 


}


'Sumber Aplikasi'
const SumberAplikasi = 'AGENT'
const objSumberAplikasi = page.getByRole('textbox', { name:'Sumber Aplikasi' })
await expect(objSumberAplikasi).toBeVisible()
await objSumberAplikasi.pressSequentially(SumberAplikasi, { delay:50 })
await objSumberAplikasi.press('ArrowDown')
await objSumberAplikasi.press('Enter')
shot = 'test-results/step-screenshots/select-Sumber-Aplikasi.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Activity'
const Activity = 'take over'
const objActivity = page.getByRole('textbox', { name: 'Activity' })
await expect(objActivity).toBeVisible()
await objActivity.pressSequentially(Activity, { delay:50 })
await objActivity.press('ArrowDown')
await objActivity.press('Enter')
shot = 'test-results/step-screenshots/Input-Activity.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Get Program Marketing'
const objGetMarketing = page.getByRole('button', { name: 'Get Program Marketing' })
await expect(objGetMarketing).toBeVisible()
await objGetMarketing.click()

const objTextSuccesGetMarketing = page.getByText('Success', { exact: true })

if ( await objTextSuccesGetMarketing.waitFor({ timeout:4000 }).then(() => true).catch(() => false) ) {
     
   shot = 'test-results/step-screenshots/Succes-Get-Marketing.png'
   await page.screenshot({ path: shot })
   screenshotPaths.push(shot)
   await objOK.click()


} else {

   shot = 'test-results/step-screenshots/Failed-Get-Marketing.png'
    await page.screenshot({ path: shot })    
    screenshotPaths.push(shot)

    throw new Error('Gagal get price: text "Success" tidak muncul') 


}

'Promotion'
const Promotion = 'Reguler'
const objPromotion = page.getByRole('textbox',{ name:'Promotion' })
await expect(objPromotion).toBeVisible()
await objPromotion.pressSequentially(Promotion,{ delay:50 })
await objPromotion.press('ArrowDown')
await objPromotion.press('Enter')
shot = 'test-results/step-screenshot/Input-Promotion.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Calculate LTV'
const objCalculateLTV = page.getByRole('button', { name:'Calculate LTV' })
await expect(objCalculateLTV).toBeVisible()
await page.waitForTimeout(1000)
await objCalculateLTV.click()

'validasi Success Calculate '
const objSuccesCaculate = page.getByText('Success', { exact:true })

if (await objSuccesCaculate.waitFor({ timeout:4000 }).then(() => true).catch(() => false)) {
    shot = 'test-results/step-screenshots/Succes-Calculate.png'
    await page.screenshot({ path: shot })
    screenshotPaths.push(shot)
    await objOK.click()

} else {

    shot = 'test-results/step-screenshots/Failed-Calculate.png'
    await page.screenshot({ path: shot })    
    screenshotPaths.push(shot)
    
    throw new error('Gagal Calculate LTV')

}

'Plafon'
const plafond = '18000000'
const objPlafond = page.locator('[name="SimPlafonLTV"]')
await expect(objPlafond).toBeVisible()
await objPlafond.fill(plafond)

'Tenor'
const tenor = '11'
const objTenor = page.getByRole('textbox', { name:'Tenor' })
await expect(objTenor).toBeVisible()
await objTenor.pressSequentially(tenor,{ delay:50 })
await page.waitForTimeout(2000)
await objTenor.press('Enter')
await page.waitForTimeout(1000)
shot = 'test-results/step-screenshots/Select-Tenor.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Calculate Installment'
const objCalculateInstallment = page.getByRole('button', { name: 'Calculate Installment' })
await expect(objCalculateInstallment).toBeVisible()
await page.waitForTimeout(1000)
await objCalculateInstallment.click()
await page.waitForTimeout(1000)

'validasi success installment'
const objSuccessInstallment = page.getByText('Success', { exact: true })

if (await objSuccessInstallment.waitFor({ timeout:5000 }).then(() => true).catch(() => false)) {
    shot = 'test-results/step-screenshots/Succes-Installment.png'
    await page.screenshot({ path: shot })
    screenshotPaths.push(shot)
    await objOK.click()

} else {

    shot = 'test-results/step-screenshots/Failed-Calculate.png'
    await page.screenshot({ path: shot })    
    screenshotPaths.push(shot)
    
    throw new error('Gagal Calculate LTV')

}

'Input Data Awal'
const objInputDataAwal = page.getByRole('button', { name: 'Input Data Awal' })
await objInputDataAwal.scrollIntoViewIfNeeded()
shot = 'test-results/step-screenshots/Input-Data-Awal.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)
await expect(objInputDataAwal).toBeVisible()
await objInputDataAwal.click()

'Pop Up Konfirmasi'
const objKonfirmasiSubmit = page.getByText('Submit Data Simulasi', { exact: true })
await expect(objKonfirmasiSubmit).toBeVisible()
shot = 'test-results/step-screenshots/Konfirmasi-Submit.png'
await page.screenshot({ path: shot })    
screenshotPaths.push(shot)
await objOK.click()

'validasi succes simpan'
const objSuccessSimpan = page.getByText('Data Simulasi Berhasil Disimpan', { exact: true })

if (await objSuccessSimpan.waitFor({ timeout:4000 }).then(() => true).catch(() => false) ) {
    
    shot = 'test-results/step-screenshots/Succes-Submit-Simulasi.png'
    await page.screenshot({ path: shot })
    screenshotPaths.push(shot)
    await objOK.click()

} else {
    shot = 'test-results/step-screenshots/Gagal-Submit.png'
    await page.screenshot({ path: shot })
    screenshotPaths.push(shot)
    throw new error('Gagal Submit')

}

'validasi nama konsumen'
await expect(page.locator(`input[value='${NamaDebitur}']`)).toBeVisible()

'Tempat Lahir'
const tempatLahir = 'Netherlands'
const objTempatLahir = page.locator('[name="TempatLahir"]')
await objTempatLahir.fill(tempatLahir)
shot = 'test-results/step-screenshots/Succes-Submit-Simulasi.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Tanggal Lahir'
const tglLahir = '1983-09-01'
const objTanggalLahir = page.locator('[name="TanggalLahir"]')
await expect(objTanggalLahir).toBeVisible()
await objTanggalLahir.fill(tglLahir)
shot = 'test-results/step-screenshots/Input-tanggal-lahir.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Email'
const objEmail = page.locator('[name="Email1"]')
await expect(objEmail).toBeVisible()
await objEmail.fill(Email)
shot = 'test-results/step-screenshots/Input-Email.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'No HP 2'
const NoHP2 = '086632987623'
const objNoHP2 = page.locator('[name="Handphone2"]')
await expect(objNoHP2).toBeVisible()
await objNoHP2.fill(NoHP2)

'No HP 3'
const NoHP3 = '08778765207'
const objNoHP3 = page.locator('[name="Handphone3"]')
await expect(objNoHP3).toBeVisible()
await objNoHP3.fill(NoHP3)

'Alamat'
const alamat = '21 Jump Street'
const objAlamat = page.getByRole('textbox', { name:'Alamat' })
await expect(objAlamat).toBeVisible()
await objAlamat.fill(alamat)

'RT'
const RT = '085'
const objRT = page.getByRole('textbox', { name: 'RT' })
await expect(objRT).toBeVisible();
await objRT.fill(RT)

'RW'
const RW = '085'
const objRW = page.getByRole('textbox', { name: 'RW' })
await expect(objRW).toBeVisible();
await objRW.fill(RW)

'Provinsi'
const Provinsi = 'Jakarta'
const objProvinsi = page.getByRole('textbox', { name: 'Provinsi' })
await expect(objProvinsi).toBeVisible();
await objProvinsi.pressSequentially(Provinsi,{ delay : 50 })
await page.waitForTimeout(500)
await objProvinsi.press('ArrowDown')
await page.waitForTimeout(500)
await objProvinsi.press('Enter')
shot = 'test-results/step-screenshots/select-provinsi.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'Kota'
const Kota = 'Jakarta Selatan'
const objKota = page.getByRole('textbox', { name: 'Kota' })
await expect(objKota).toBeVisible()
await objKota.pressSequentially(Kota, { delay: 50 })
await page.waitForTimeout(500)
await objKota.press('ArrowDown')
await page.waitForTimeout(500)
await objKota.press('Enter')

'kecamatan'
const kecamatan = 'Cilandak'
const objKecamatan = page.getByRole('textbox', { name: 'Kecamatan' })
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
const objKelurahan = page.getByRole('textbox', { name : 'Kelurahan/Desa' })
await objKelurahan.scrollIntoViewIfNeeded()
await expect(objKelurahan).toBeVisible()
await objKelurahan.pressSequentially(kelurahan,{ delay : 50 })
await page.waitForTimeout(500)
await objKelurahan.press('ArrowDown')
await page.waitForTimeout(500)
await objKelurahan.press('Enter')
shot = 'test-results/step-screenshots/input-kelurahan.png'  
await page.screenshot( { path: shot })
screenshotPaths.push(shot)

'Foto Consent Letter'
const objConsentLetter = page.locator('input[type="file"]')
await uploadFile(page,objConsentLetter,'sampleUpload.png')

shot = 'test-results/step-screenshots/upload-foto.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'No ID Referantor'
const NoIDReferantor = 'XTRP260814483'
const objIDReferantor = page.locator('[name="IDReferantor"]')
await expect(objIDReferantor).toBeVisible()
await objIDReferantor.fill(NoIDReferantor)

'cek id referantor'
const objCekID = page.getByRole('button', { name: 'Cek ID Referantor' })
await expect(objCekID).toBeVisible()
await objCekID.click()

'validasi success cek id'

const objTextIDSesuai = page.getByText('Kode Referantor sesuai', { exact: true })

if (await objTextIDSesuai.waitFor({ timeout:5000 }).then(() => true).catch(() => false) ) {
    await page.waitForTimeout(1000)
    shot = 'test-results/step-screenshots/Succes-Cek-ID.png'
    await page.screenshot({ path: shot })
    screenshotPaths.push(shot)
    await objOK.click()

} else {
    shot = 'test-results/step-screenshots/Gagal-Submit.png'
    await page.screenshot({ path: shot })
    screenshotPaths.push(shot)
    throw new error('ID Salah-Atau-Error')

}

'klik submit'
const objSubmit = page.getByRole('button', { name : 'Submit' })
await expect(objSubmit).toBeVisible()
await objSubmit.click()

'Pop Up Konfirmasi'
const objKonfirmasiSubmitDataAwal = await page.getByText('Submit Data Awal', { exact: true })
await expect(objKonfirmasiSubmitDataAwal).toBeVisible()
shot = 'test-results/step-screenshots/Konfirmasi-Submit-Data-Awal.png'
await page.screenshot({ path: shot })    
screenshotPaths.push(shot)
await objOK.click()

'validasi sukses'
const objIconSukses = page.locator('div.swal-icon--success__ring')
const objTextSukses = page.locator('div.swal-modal div.swal-text')
const objBtnOK = page.getByRole('button', { name: 'OK' })

try {
  await objIconSukses.waitFor({ state: 'visible', timeout: 10000 })
} catch {
  throw new Error('Object gagal ditemukan - icon sukses tidak muncul')
}

await expect(objTextSukses).toContainText('No Aplikasi')

'get no aplikasi' 
const fullText = await objTextSukses.innerText()
console.log('Full text:', fullText)

const noAplikasi = fullText.match(/No Aplikasi\s*:\s*(\S+)/)?.[1] ?? ''
if (!noAplikasi) throw new Error(`No Aplikasi tidak ditemukan di text: ${fullText}`)
console.log('Nomor Aplikasi:', noAplikasi)

shot = 'test-results/step-screenshots/validasi-sukses.png'
await page.screenshot({ path: shot })
screenshotPaths.push(shot)

'close pop up'
await expect(objBtnOK).toBeVisible()
await objBtnOK.click()
await expect(objTextSukses).toBeHidden()


await combineScreenshotsToPdf(
    screenshotPaths,
    'test-results/report/Simulasi-Dana-Syariah.pdf',
    {
      testName: testInfo.title,
      status: testInfo.status ?? 'unknown',
      startTime: testStart,
      environment: 'UAT',
    }
  )



})



