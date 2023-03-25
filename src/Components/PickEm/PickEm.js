import React, { useState, useEffect } from 'react';
import './PickEm.css';
import '../Main.css';
import Game from '../Game/Game';
import { fetchNFLGames, saveSelections } from '../../services/api'; // Import the fetchNFLGames and saveSelections functions


const PickEm = () => {
  const [games, setGames] = useState([]);
  const [selections, setSelections] = useState({}); // State variable to keep track of user's selections

  useEffect(() => {
    const fetchGames = async () => {
      const season = '2022'; // Replace with the desired season
      const week = '01'; // Replace with the desired week
      const gameData = await fetchNFLGames(season, week);
      if (gameData && gameData.events) {
        setGames(gameData.events);
      }
    };

    fetchGames();
  }, []);

  // Function to handle user's selection for a game
  const handleSelectWinner = (gameId, winner) => {
    setSelections({ ...selections, [gameId]: winner });
  };

  // Function to save the user's selections
  const handleSaveSelections = async () => {
    const result = await saveSelections(selections); // Call the saveSelections function with the selections data
    if (result && result.success) {
      console.log('Selections saved successfully!');
    } else {
      console.log('Error saving selections.');
    }
  };

  return (
    <div className="pick-em">
      <h2 className='header'>NFL Pick Em</h2>
      <p className='c m'>Select the winners for each game:</p>
      <div className='card'>
        <div className="game-list">
          {games.map((game) => (
            <Game
              key={game.idEvent}
              game={game}
              onSelectWinner={handleSelectWinner} // Pass the function to the Game component
            />
          ))}
        </div>
        <div className='container'>
          <button className="main-button c" onClick={handleSaveSelections}>Save Selections</button>
        </div>
      </div>
    </div>
  );
};

export default PickEm;
