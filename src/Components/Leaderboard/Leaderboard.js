// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase'; // Import your Firebase configuration

const groupId = 'dqxvPN91d7PZKyOk9vSz';
const league = 'nfl-s2022';
const round = 'r01';

// fetchLeaderboardData function
async function fetchLeaderboardData(groupId, league, round) {
  const leaderboardData = [];
  const groupResultsRef = db.collection('results').doc(groupId).collection('leagues').doc(league).collection('round').doc(round);
  const resultsSnapshot = await groupResultsRef.get();

  resultsSnapshot.forEach((doc) => {
    const userData = doc.data();
    leaderboardData.push({
      userId: doc.id,
      dailyScore: userData.dailyScore,
    });
  });

  return leaderboardData;
}

// Leaderboard component
function Leaderboard({ groupId, league, round }) {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchLeaderboardData(groupId, league, round);
      setLeaderboardData(data);
    }

    fetchData();
  }, [groupId, league, round]);

  return (
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Daily Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map((userScore) => (
          <tr key={userScore.userId}>
            <td>{userScore.userId}</td>
            <td>{userScore.dailyScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Leaderboard;
