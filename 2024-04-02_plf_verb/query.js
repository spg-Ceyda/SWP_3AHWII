console.log('here is my query:');
// TODO
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getwatchlistsname(benutzerId) {
    const benutzer = await prisma.benutzer.findUnique({
        where: { id: benutzerId},
        include: { Watchlist: true},
    });
    return benutzer.watchlists;
}



async function getwatchtracks(watchlistsID) {
    const watchlist = await prisma.watchlists.findUnique({
        where: { id: watchlists},
        include: { tracks: true},
    });
    return watchlist.tracks;
}


async function main() {
    try {
      const watchlistnames = await getwatchlistnames(1);
      console.log('Watchlist-Namen für Benutzer mit ID 1:', getwatchlistsname);
  
      const trackswatchlist = await getwatchtracks(1);
      console.log('Tracks in Watchlist mit ID 1:', getwatchtracks);
    } 
    catch (error) {
      console.error('Error:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  main();