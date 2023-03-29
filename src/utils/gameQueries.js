import { db } from '../services/firebase';

//-------------------------------------------NFL GAMES ------------------------------------------------------------
export const fetchNFLGames = async (season, week) => {
    const nflSeason = "nfl-s"+season;
    const nflRound = "r"+week;
    try {
      const gamesRef = db.collection("games").doc(nflSeason).collection(nflRound);
      const snapshot = await gamesRef.get();
  
      const games = [];
      snapshot.forEach((doc) => {
        games.push({ id:doc.id, ...doc.data() });
      });
      console.log(games);
      return games;
    } catch (error) {
      console.error('Error fetching games:', error);
      return null;
    }
  };


//-------------------------------------------NBA GAMES ------------------------------------------------------------
export const fetchNBAGames = async (season, week) => {
    try {
      const gamesRef = db.collection("games").doc("nba-s2022").collection("r01");// -------------------update!!
      const snapshot = await gamesRef.get();
  
      const games = [];
      snapshot.forEach((doc) => {
        games.push({ id:doc.id, ...doc.data() });
      });
      console.log(games);
      return games;
    } catch (error) {
      console.error('Error fetching games:', error);
      return null;
    }
  };