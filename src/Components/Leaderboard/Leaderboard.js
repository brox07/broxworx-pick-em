import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import { fetchGroups, fetchGroupUsers, fetchGroupPicks } from "../../utils/groupQueries";
import { fetchNFLGames } from "../../utils/gameQueries";
import { calculateScores } from "../../utils/scoreHelpers";

const Leaderboard = () => {
  // input values during dev
  const groupId = "dqxvPN91d7PZKyOk9vSz";
  const userId = 'HIWTglfuYVNPqkI4fS6u';
  const season = '2022';
  const week = '01';

  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchGroupUsers(groupId);
      const games = await fetchNFLGames(season, week);
      const picks = await fetchGroupPicks(userId, " " + groupId);
      const picksPromises = users.map((user) => fetchGroupPicks(user, groupId));
      const picksArray = await Promise.all(picksPromises);
      const userPicks = users.map((user, index) => ({
        userId: userId, 
        picks: picksArray[index],
      }));

      console.log(users);
      console.log(games);
      console.log(picks);
      const userScores = calculateScores(users, games, userPicks);
      setScores(userScores);
    };

    fetchData();
  }, [groupId, season, week]);
  
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Daily Score</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(scores) &&
            scores.map((score) => (
              <tr>
                <td>{score.userId}</td>
                <td>{score.scores.dailyScore}</td>
                <td>{score.scores.totalScore}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
