import { db } from "../services/firebase";

export const fetchUserData = async (userId) => {
  try {
    console.log(userId + " fetched data.");
    const userDoc = await db.collection("users").doc(userId).get();
    const userData = userDoc.data();
    console.log(userData);
    return { id: userId, ...userData };
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}

export const fetchUserPicks = async (userId, groupId, league) => {
  try {
    console.log(userId + " fetching picks from group:" + groupId + " for " + league);
    const userPickRef = db.collection("users").doc(userId).collection("picks").doc(groupId).collection("leagues").doc("nfl-s2022");
    const userPicks = await userPickRef.get();
    return userPicks.data();
  } catch (error) {
    console.error("Error fetching user picks:" + userId + " for group " + groupId + " in league " + league);

  }
}