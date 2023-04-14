import { db } from "../services/firebase";
import { fetchUserData, fetchUserPicks } from "./userQueries";
import { fetchNFLGames } from "./gameQueries";

export const fetchGroupUsers = async (groupId) => {
  try {
    const usersRef = db.collection("groups").doc(groupId);
    const snapshot = await usersRef.get();
    
    let users = [];
    if (snapshot.exists) {
      const userData = snapshot.data();
      users = userData.members;
    }
    const cleanedUserIds = users.map(user => user.trim());

    return cleanedUserIds;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};

export const fetchUserGroups = async () => {
  try {
    //fetch user groups...


  } catch (error) {
    console.log("Error fetching group data", error);
    return null;
  }
};

export const fetchGroups = async () => {
  try {
    const groupsRef = db.collection("groups");
    const snapshot = await groupsRef.get();
    let groups = [];
    snapshot.forEach((doc) => {
      const groupData = doc.data();
      groups.push({ id: doc.id, name: groupData.name });
    });
    return groups;
  } catch (error) {
    console.log("Error fetching group data", error);
    return null;
  }
};

export const fetchGroupPicks = async (groupId, league, season, week) => {
  try {
    let userPicks = []
    const users = await fetchGroupUsers(groupId);
    users.forEach(user => {
      league = 'nfl-s2022';
      const userPicks = fetchUserPicks(user, groupId, league);
      
      
      
    });
    
    
    
    
    
    
    // const usersPromises = users.map((userId) => fetchUserData(userId));
    // const gamesPromise = fetchNFLGames(season, week);
    // console.log(gamesPromise);
    // const [usersData, gamesData] = await Promise.all([Promise.all(usersPromises), gamesPromise]);

    // const picksWithResults = usersData.map((user) => {
    //   //console.log(user);
      

    //   const userPicks = user.picks[`${league}-${season}`]?.[week] || {};

    //   const userGames = gamesData.map((game) => {
    //     const pick = userPicks[game.id];
    //     const correctPick = game.result === pick;

    //     return {
    //       gameId: game.id,
    //       homeTeam: game.homeTeam,
    //       awayTeam: game.awayTeam,
    //       userPick: pick,
    //       correctPick: correctPick,
    //     };
    //   });

    //   return {
    //     userId: user.id,
    //     name: user.name,
    //     games: userGames,
    //   };
    // });

    return ;
  } catch (error) {
    console.error("Error fetching group picks with results:", error);
    return [];
  }
};
