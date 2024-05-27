const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { fakerDE } = require('@faker-js/faker');


async function main() {
    for (let i = 0; i < 5; i++) {
        const zoo = await prisma.zoo.create({
            data: {
            land: fakerDE.location.country(),
            stadt: fakerDE.location.city(),
            adresse: fakerDE.location.streetAddress(),
            baujahr: fakerDE.date.past().getFullYear(),
        },
    });

    let abteilung;
    for (let j = 0; j < fakerDE.number.int({min: 2, max: 7}); j++) {
         abteilung = await prisma.abteilung.create({
            data: {
            name: fakerDE.animal.type(),
            zooId: zoo.id,
            },
        });
    }       
        
    for (let c = 0; c < fakerDE.number.int({min: 5, max: 20}); c++) {
        const tier =  await prisma.tier.create({
            data: {
            name: fakerDE.person.firstName(),
            art: fakerDE.animal.type(),
            abteilungId: abteilung.id,
            
            },
        });
    }     

    for (let h = 0; h < 100; h++) {
        await prisma.mitarbeiter.create({
            data: {
            name: fakerDE.person.firstName(),
            
        },
    });
    
}
}
}


main()
    .then ((rw) => console.log('seeding done: ', rw))
    .catch((e) => console.log('Es gab Fehler', e.message));

