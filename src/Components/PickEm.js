import React, { useState, useEffect } from 'react';
import './PickEm.css';
import Game from './Game';
import { fetchNFLGames } from './../api'; // Import the fetchNFLGames function

const PickEm = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const season = '2014-2015'; // Replace with the desired season
      const week = '38'; // Replace with the desired week
      const gameData = await fetchNFLGames(season, week);
      if (gameData && gameData.events) {
        setGames(gameData.events);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="pick-em">
      <h1>NFL Pick Em</h1>
      <p>Select the winners for each game:</p>
      <div className="game-list">
        {games.map((game) => (
          <Game key={game.idEvent} game={game} />
        ))}
      </div>
    </div>
  );
};

export default PickEm;
