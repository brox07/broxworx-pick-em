import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PickEm.css';
import '../Main.css';
import Game from '../Game/Game';
import { fetchNFLGames, saveSelections } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.js';

const PickEm = () => {
  const { currentUser } = useAuth();
  const [games, setGames] = useState([]);
  const [selections, setSelections] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedWeek, setWeek] = useState('01'); // Add week state variable

  const handleWeekChange = (newWeek) => {
    setWeek(newWeek);
  };

  const handleDropdownChange = (e) => {
    handleWeekChange(e.target.value);
  };

  const handleResetSelections = () => {
    setSelections({});
    setHasChanges(true);
    setIsSuccess(false);
  };

  useEffect(() => {
    const fetchGames = async () => {
      const season = '2022';
      const week = selectedWeek.toString().padStart(2, '0');
      const gameData = await fetchNFLGames(season, week);
      if (gameData && gameData.events) {
        setGames(gameData.events);
      }
    };
  
    const fetchSelections = async () => {
      if (currentUser) {
        const league = 'NFL';
        const season = '2022';
  
        const selectionsRef = doc(
          db,
          'users',
          currentUser.uid,
          'leagues',
          league,
          'seasons',
          season,
          'weeks',
          selectedWeek
        );
        const selectionsDoc = await getDoc(selectionsRef);
        if (selectionsDoc.exists()) {
          setSelections(selectionsDoc.data());
        }
      }
    };
  
    fetchGames();
    fetchSelections();
  }, [currentUser, selectedWeek]); // Add selectedWeek dependency
useEffect(() => {
  if (currentUser) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, [currentUser]);

const handleSelectWinner = (gameId, winner) => {
  const updatedSelections = { ...selections, [gameId]: winner };
  setSelections(updatedSelections);
  setHasChanges(true);
  setIsSuccess(false);
};

const [isSuccess, setIsSuccess] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

const handleSaveSelections = async () => {
  try {
    const league = 'NFL';
    const season = '2022';
    const week = selectedWeek.toString().padStart(2, '0');

    const selectionsRef = doc(
      db,
      'users',
      currentUser.uid,
      'leagues',
      league,
      'seasons',
      season,
      'weeks',
      week
    );

    const currentWeekSelections = Object.fromEntries(
      Object.entries(selections).filter(([gameId]) => games.some(game => game.idEvent === gameId))
    );

    await setDoc(selectionsRef, currentWeekSelections);
    console.log('Selections saved successfully!');
    setIsSuccess(true);
    setErrorMessage('');
    setHasChanges(false);
  } catch (error) {
    console.log('Error saving selections.', error);
    setIsSuccess(false);
    setErrorMessage('Error saving selections.');
  }
};


return (
  <>
    {isLoggedIn && (
      <div className="pick-em">
        <h2 className="header">NFL Pick Em Week {selectedWeek}</h2>
        <div className="week-selector">
          <label htmlFor="week">Week: </label>
          <select
            name="week"
            id="week"
            value={selectedWeek}
            onChange={handleDropdownChange}
          >
            {Array.from({ length: 18 }, (_, i) => i + 1).map((weekNumber) => (
              <option key={weekNumber} value={weekNumber}>
                {weekNumber}
              </option>
            ))}
          </select>
        </div>
        {isLoggedIn ? (
          <div>
            <p className="c m">Select the winners for each game:</p>
            <div className="card">
              <div className="game-list">
                {games.map((game) => (
                  <Game
                    key={`${game.idEvent}-${selections[game.idEvent]}`}
                    game={game}
                    selectedWinner={selections[game.idEvent]}
                    onSelectWinner={handleSelectWinner}
                  />
                ))}
              </div>

              <div className="container">
                {isSuccess && (
                  <p className="success-message">
                    Selections saved successfully!
                  </p>
                )}
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
              <div className="buttons-container">
                <button
                  className={`main-button c${hasChanges ? "" : " disabled"}`}
                  onClick={handleSaveSelections}
                  disabled={!hasChanges}
                >
                  {hasChanges ? "Update Selections" : "Selections Saved"}
                </button>
                <div className="reset-selections">
                  <button className="reset-button" onClick={handleResetSelections}>
                    Reset Selections
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="blur c m">
            <p className="c m">
              Please log in or sign up to view this content
            </p>
            <Link to="/login" className="main-button c">
              Log In
            </Link>
            <Link to="/signup" className="main-button c">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    )}
  </>
);
}

export default PickEm;
