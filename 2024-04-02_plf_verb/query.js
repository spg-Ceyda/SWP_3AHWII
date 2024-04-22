console.log('here is my query:');
// TODO
// Track-Name gegeben:
// 1) auf welchen Watchlists kommt er vor?
// 2) welche User haben diesen Track auf einer ihrer Watchlists?
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


//1) auf welchen watchlists kommt der track vor? (funktioniert noch nicht)
async function getWatchlistsContainingTrack(trackName) {
    const track = await prisma.track.findMany({
        where: { name: trackName },
        include: { watchlists: true },
    });
    return track.watchlists;
}

//2
async function getUsersWhoHasTrackInWatchlist(benutzerName) {
    const benutzer = await prisma.benutzer.findFirst({
        where: {fullname: benutzerName},
        include: {watchlists: true},
    });
    return benutzer ? benutzer.watchlists : null;
}


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
      // const watchlistnames = await getwatchlistsname(1);
      // console.log('Watchlist-Namen für Benutzer mit ID 1:', watchlistnames);
  
      // const trackswatchlist = await getwatchtracks(1);
      // console.log('Tracks in Watchlist mit ID 1:', trackswatchlist);

      const trackName = "Roses Are Red"; //irgendein track aus der db
      const watchlistsContainingTrack = await getWatchlistsContainingTrack(trackName);
      console.log('Der Track' + trackName + 'kommt auf folgenden Watchlists vor:', watchlistsContainingTrack); 

      const benutzerName = "Roses Are Red";
      const UsersWhoHasTrackInWatchlist = await getUsersWhoHasTrackInWatchlist(benutzerName);
      console.log('Dieser' + benutzerName + 'hat folgenden Track in ihrer Watchlist', UsersWhoHasTrackInWatchlist);

    } 
    catch (error) {
      console.error('Error:', error);
    } finally {
      await prisma.$disconnect();
    }

 }

  main();