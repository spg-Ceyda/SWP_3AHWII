const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');


async function main(){
    const customers = [];
    const banks = [];
    const transactions = [];
    const accounts = [];

    
    let bank;
    //bank
    for (let j=0; j < 5; j++){
          bank = await prisma.bank.create({
            data: {
                bic: faker.finance.bic(),
            },
        });
        banks.push(bank);
    }

    //customer 
    for (let i=0; i < 10; i++){
        const customer = await prisma.customer.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                bankId: bank.id,
            },
        });
        customers.push(customer);
    }
    //account
    for (let  k = 0;  k < 10;  k++) {
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const randomBank = banks[Math.floor(Math.random() * banks.length)];
        const account = await prisma.account.create({
            data: {
                iban: faker.finance.iban(),
                bankId: randomBank.id,
                customerId: randomCustomer.id,
            }
        
    });

    //transaction
    for (let h = 0; h < 10; h++) {
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const randomBank = banks[Math.floor(Math.random() * banks.length)];
        const randomFromAcct = accounts[Math.floor(Math.random() * accounts.length)];
        const randomToAcct = accounts[Math.floor(Math.random() * accounts.length)];


        const transaction = await prisma.transaction.create({
            data: {
                verwendungszweck: faker.finance.transactionType(),
                amount: faker.finance.amount(),
                date: faker.date.recent(),
                fromAcct: randomFromAcct.id,
                toAcct: randomToAcct.id,
                customerId: randomCustomer.id,
                bankId: randomBank.id,

            }});

}}}

main()
.then(async() => {
  console.log('Seeding abgeschlossen');
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error('Fehler beim Seed-Vorgang:', e.message);
  await prisma.$disconnect();
  process.exit(1);
});

  
