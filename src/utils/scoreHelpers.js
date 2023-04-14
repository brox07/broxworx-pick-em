import { db } from "../services/firebase";
import { fetchNFLGames } from "./gameQueries";
import { fetchGroupUsers, fetchUserPicks } from "./groupQueries";

export const fetchScores = async (groupId) => {
    try {
        const scoresRef = db.collection("groups").doc(groupId).collection("scores");
        const snapshot = await scoresRef.get();

        let scores = [];
        snapshot.forEach((doc) => {
            const scoreData = doc.data();
            scores.push({ ...scoreData, id: doc.id });
        })

        return scores;
    } catch (error) {
        console.error(`Error fetching scores for group ${groupId}`, error);
        return null;
    }
}

export function isToday(date) {
    const today = new Date();
    const inputDate = new Date(date);

    return (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
    );
}

export const calculateScores = async (groupId, league, round) => {
    const games = await fetchNFLGames(league, round);
    const users = await fetchGroupUsers(groupId);
    const resultsRef = db.collection("results").doc(groupId).collection('leagues').doc(league);

    const picksPromises = users.map((user) => fetchUserPicks(user, groupId, league)); 
    const picksArray = await Promise.all(picksPromises);

    const userPicks = users.map((user, index) => ({
        userId: user,
        picks: picksArray[index],
      }));
    
      const scores = userPicks.map((user) => {
        const correctPicks = user.picks.filter((pick) =>
          games.some(
            (game) =>
              (game.strHomeTeam === pick && game.intHomeScore > game.intAwayScore) ||
              (game.strAwayTeam === pick && game.intAwayScore > game.intHomeScore)
          )
        ).length;
    
        return {
          userId: user.userId,
          dailyScore: correctPicks,
        };
      });
    
      // Update the results in the Firestore
      for (const score of scores) {
        await resultsRef
          .collection('round')
          .doc(round)
          .set({ [score.userId]: score.dailyScore }, { merge: true });
      }
};