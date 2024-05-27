const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


 
async function findZooByName(name){
    try{
        const zoos = await prisma.zoo.findMany({
            select: { id: true, land: true, stadt: true, adresse: true, baujahr: true },
        });
        if (!zoos) {
            throw new Error(`Zoo mit dem Namen: ${name} wurde nicht gefunden.`);
        }
        console.log('Gefundener Zoo:', zoos);


        const zooId = zoos[0].id; 
        const zoo = await prisma.zoo.findUnique({
            where: { id: zooId },
            include: { abteilungen: true },
        });
        console.log(`Infos über den Zoo mit der ID: ${zooId}:`, zoo);
        

        const abteilungen = await prisma.abteilung.findMany({
            where: { zooId },
        });
          console.log(`Alle Abteilungen des Zoos mit der ID: ${zooId}:`,zoo);
        


        for (const abteilung of abteilungen) {
            const tiereCount = await prisma.tier.count({
              where: { abteilungId: abteilung.id },
            });
            console.log(`Abteilung ${abteilung.name} hat ${tiereCount} Tiere`);
          
            const mitarbeiter = await prisma.mitarbeiter.findMany({
                where: {
                  abteilungen: {
                    some: { zooId },
                  },
                },
                include: { abteilungen: true },
              });
              console.log(`Alle Mitarbeiter des Zoos mit der ID ${zooId}:`, mitarbeiter);
            
              
            const mitarbeiterId = mitarbeiter[0].id; 
              const mitarbeiterDetails = await prisma.mitarbeiter.findUnique({
                where: { id: mitarbeiterId },
                include: { abteilungen: { include: { tiere: true } } },
              });
            
              let tiereBetreut = 0;
              const tierNamen = [];
            
            }}

catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
} finally {
    await prisma.$disconnect();
}
}


async function main() {
    await findZooByName('BeispielZooName');
}

    

main();