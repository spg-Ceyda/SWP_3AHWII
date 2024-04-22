console.log('here is my query:');
// TODO
// Track-Name gegeben:
// 1) auf welchen Watchlists kommt er vor?
// 2) welche User haben diesen Track auf einer ihrer Watchlists?
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


//1) auf welchen watchlists kommt der gegebene track vor?
async function getWatchlistsContainingTrack(trackName) {
    const tracks = await prisma.track.findMany({
        where: { name: trackName },
        include: { watchlists: true },
    });
    const watchlists = [];
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      for (let j = 0; j < track.watchlists.length; j++) {
          watchlists.push(track.watchlists[j]);
      }
  }
    return watchlists;
}

//2) welche user haben den gegebenen track auf einer ihrer watchlists?
async function getUsersWhoHaveTrackInWatchlist(trackName) {
  const users = await prisma.benutzer.findMany({
      where: { watchlists: { some: { tracks: { some: { name: trackName } } } } },
      include: { watchlists: true },
  });
  return users;
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
      console.log('Der Track ' + trackName + ' kommt auf folgenden Watchlists vor: ', watchlistsContainingTrack); 

      const UsersWhoHaveTrackInWatchlist = await getUsersWhoHaveTrackInWatchlist(trackName);
      console.log('Folgende Benutzer haben den Track ' + trackName + ' in einer ihrer Watchlists: ', UsersWhoHaveTrackInWatchlist);

    } 
    catch (error) {
      console.error('Error:', error);
    } finally {
      await prisma.$disconnect();
    }

 }

  main();