import { expect, Expect, test } from "@playwright/test";

test('input field', async ({ page }) => {

await page.goto('https://bosswebapp-uat.bussan.co.id/')
await page.waitForTimeout(3000)

let Username = 'adminopexcollection';
let Password = 'Bussan100';

const parentLogin = page.locator('div.bg-white.rounded-4.shadow-lg.px-4.py-4.d-flex.flex-column.align-items-center')
await expect(parentLogin.getByRole('textbox',{ name: 'Username' })).toBeVisible();
await parentLogin.getByRole('textbox', { name : 'Username' }).fill(Username);

await expect(parentLogin.getByRole('textbox',{ name: 'Password' })).toBeVisible();
await parentLogin.getByRole('textbox', { name : 'Password' }).fill(Password);

const objlogin = page.locator('button').filter({ hasText: 'Login' }).first()
await expect(objlogin).toBeVisible();
await objlogin.click()

const objOK = page.getByText('OK');
await expect(objOK).toBeVisible();
await objOK.click();

const textOPEX = page.getByText('OPEX', { exact: true });
await expect(textOPEX).toBeVisible();
await textOPEX.click();

const loopklikOK = 2;

for (let i = 0; i < loopklikOK; i++) {

    await expect(objOK).toBeVisible();
    await objOK.click();

}

});


test('login cura',async ({ page }) => {

let Url = 'https://katalon-demo-cura.herokuapp.com/'
let username = 'John Doe'
let password = 'ThisIsNotAPassword'

 await page.goto(Url)

 const objBtnMakeAppointment = page.getByRole('link', { name : 'Make Appointment'})
 await expect(objBtnMakeAppointment).toBeVisible();
 await objBtnMakeAppointment.click()

 const objUsername = page.getByLabel('Username', { exact: true })
 await expect(objUsername).toBeVisible()
 await objUsername.fill(username)

 const objPassword = page.getByLabel('Password', { exact : true })
 await expect(objPassword).toBeVisible()
 await objPassword.fill(password)

 const objBtnLogin = page.getByRole('button', { name : 'Login' })
 await expect(objBtnLogin).toBeVisible()
 await objBtnLogin.click()

 const objListFacility = page.getByRole('combobox', { name : 'Facility' })
 await expect(objListFacility).toBeVisible()
 await objListFacility.selectOption({ index : 2 })

const objCheckBoxApply = page.getByRole('checkbox', { name: 'Apply for hospital readmission' })
await objCheckBoxApply.check({ force :true })
await page.waitForTimeout(3000)

const allBoxes = page.getByRole('checkbox')
for (const box of await allBoxes.all()) {
    await box.uncheck({ force :true })

}

const RadioBtn = page.getByRole('radio',{ name:'Medicaid' })
await expect(RadioBtn).toBeVisible()
await expect(RadioBtn).not.toBeChecked()
await RadioBtn.check()
await expect(RadioBtn).toBeChecked()



});




