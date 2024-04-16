console.log('here is my query:');
// TODO
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getwatchlistsname(benutzerId) {
    const benutzer = await prisma.benutzer.findUnique({
        where: { id: benutzerId},
        include: { watchlists: true},
    });
    return benutzer.watchlists;
}



async function getwatchtracks(watchlistsID) {
    const watchlist = await prisma.watchlist.findUnique({
        where: { id: watchlistsID},
        include: { tracks: true},
    });
    return watchlist.tracks;
}


async function main() {
    try {
      const watchlistnames = await getwatchlistsname(1);
      console.log('Watchlist-Namen für Benutzer mit ID 1:', watchlistnames);
  
      const trackswatchlist = await getwatchtracks(1);
      console.log('Tracks in Watchlist mit ID 1:', trackswatchlist);
    } 
    catch (error) {
      console.error('Error:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  main();