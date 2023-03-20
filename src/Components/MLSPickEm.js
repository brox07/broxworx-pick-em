import React, { useState, useEffect } from 'react';
import './PickEm.css'; // Reusing the same CSS file from the NFL pick-em page
import Game from './Game';
import { fetchMLSGames } from './../api'; // Import the fetchMLSGames function

const MLSPickEm = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const season = '2023'; // Replace with the desired season
      const week = '1'; // Replace with the desired week
      const gameData = await fetchMLSGames(season, week); // Use the fetchMLSGames function
      if (gameData && gameData.events) {
        setGames(gameData.events);
      } else {
        console.error('Error fetching MLS games. Check if the API request is correct or if there are any issues with the API response.');
        console.log('API response:', gameData);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="pick-em">
      <h1>MLS Pick Em</h1>
      <p>Select the winners for each game:</p>
      <div className="game-list">
        {games.map((game) => (
          <Game key={game.idEvent} game={game} />
        ))}
      </div>
    </div>
  );
};

export default MLSPickEm;
