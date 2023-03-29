import { db } from "../services/firebase";

export const fetchGroupUsers = async (groupId) => {
  try {
    const usersRef = db.collection("groups").doc(groupId);
    const snapshot = await usersRef.get();
    
    let users = [];
    if (snapshot.exists) {
      const userData = snapshot.data();
      users = userData.members;
    }
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
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
}

export const fetchGroupPicks = async (userId, groupId) => {
  try {    
    const picksRef = db.collection("users").doc(userId).collection("picks").doc(groupId)
                    .collection("leagues").doc("nfl-s2022");
    const snapshot = await picksRef.get();
    let picks = [];
    if (snapshot.exists) {
      const pickData = snapshot.data();
      picks = pickData.r01;
    }
    
    return picks;
  } catch (error) {
    console.error(`Error fetching user picks for ${groupId}`, error);
    return null;
  }
};