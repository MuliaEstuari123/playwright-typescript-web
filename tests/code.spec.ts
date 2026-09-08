import { expect, test } from "@playwright/test";

//concatination and interpolation


test.skip('interpolation', async ( { page } ) => {

var price = 50
var itemName = "cup"
var massagePoint = "the price for your " +itemName+ " is 50 dollars"

console.log(massagePoint)


})


test.skip('arrays and objects', async ( { page } ) => {

var customer = {

   firtName : 'Rachel',
   LastName : 'Estu'

}

customer.firtName = 'gaylee'
customer.LastName = 'averil'

console.log(`${customer.firtName} ${customer.LastName}`)



})






test('ulang lagi', async ({page}) => {

var Country = {

      USA : 'los Angeles',
      German : 'Berlin',
      Japan : 'Tokyo,kyoto',
      Franch : 'Paris'

}

console.log(Country.Japan)


});


