import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { fetchNFLGames } from '../../services/api';

const Leaderboard = () => {
  const [userData, setUserData] = useState([]);
  const [games, setGames] = useState([]);
  const [weekId, setWeekId] = useState('01');

  const fetchGamesData = async () => {
    const gameData = await fetchNFLGames('2022', weekId);
    if (gameData && gameData.events) {
      setGames(gameData.events);
    }
  };

  const fetchData = async () => {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(query(usersRef));
    const usersData = [];

    for (const userDoc of usersSnapshot.docs) {
      const selectionRef = doc(
        userDoc.ref,
        'leagues',
        'NFL',
        'seasons',
        '2022',
        'weeks',
        weekId
      );
      const selectionSnapshot = await getDoc(selectionRef);
      if (selectionSnapshot.exists()) {
        usersData.push({
          id: userDoc.id,
          displayName: userDoc.data().name,
          selections: selectionSnapshot.data(),
        });
      } else {
        usersData.push({
          id: userDoc.id,
          displayName: userDoc.data().name,
          selections: {},
        });
      }
    }

    setUserData(usersData);
  };

  useEffect(() => {
    fetchGamesData();
    fetchData();
  }, [weekId]);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            {games.map((game) => (
              <th key={game.idEvent}>
                {game.strHomeTeam} vs {game.strAwayTeam}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.displayName}</td>
              {games.map((game) => (
                <td key={game.idEvent}>{user.selections[game.idEvent]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
