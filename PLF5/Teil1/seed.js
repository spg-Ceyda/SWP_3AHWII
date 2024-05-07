const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');


async function main() {
    for (let i = 0; i < 5; i++) {
        const Zoo = await prisma.Zoo.create();
        data: {
            land; faker.adresse.country(),
                stadt; faker.adresse.city(),
                    adresse; faker.adresse.streetAdresse(),
                        baujahr; faker.date.past().getFullYear();
        }
    }
};




main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
