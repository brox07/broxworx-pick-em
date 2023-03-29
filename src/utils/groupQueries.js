import { db } from "../services/firebase";

export function fetchGroupUsers(groupId){
    const fetchUsers = async () => {
        const usersSnapshot = await db.collection(`groups/${groupId}/members`).get();
        const users = usersSnapshot.docs.map(doc => ({userId: doc.id, ...doc.data()}));
        return users;
      }
    let users = fetchUsers();
    return users;
}

export function fetchGroupPicks(userId, groupId){
  const fetchPicks = async () => {
      const picksSnapshot = await db.collection(`users/${userId}/picks/${groupId}`).get();
      const picks = picksSnapshot.docs.map(doc => ({userId: doc.id, ...doc.data()}));
      return picks;
    }
  let picks = fetchPicks();
  return picks;
}