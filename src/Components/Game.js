import React, { useState } from 'react';
import './Game.css';

const Game = ({ game, onSelectWinner }) => {
  const [winner, setWinner] = useState(''); // State variable to keep track of the user's selection for this game
  const homeTeam = game.strHomeTeam;
  const awayTeam = game.strAwayTeam;
  const homeScore = game.intHomeScore;
  const awayScore = game.intAwayScore;
  const date = game.dateEvent;
  const time = game.strTime;
  const timezoneOffset = new Date().getTimezoneOffset() / 60; // Calculate the timezone offset in hours
  const dateObj = new Date(date + ' ' + time + ' UTC'); // Combine the date and time strings and create a Date object
  const formattedDate = dateObj.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  });
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short',
    timeZone: 'America/New_York',
  });

  return (
    <div className="game">
      <div className="team-names">
        <label htmlFor={`away_${game.idEvent}`}>
          <input type="radio" className="radio-button" id={`away_${game.idEvent}`} name={`winner_${game.idEvent}`} value={awayTeam} checked={winner === awayTeam} onChange={(e) => setWinner(e.target.value)} />
          {awayTeam}
        </label>
        <div className='at-symbol'> @ </div>
        <label htmlFor={`home_${game.idEvent}`}>
          <input type="radio" className="radio-button" id={`home_${game.idEvent}`} name={`winner_${game.idEvent}`} value={homeTeam} checked={winner === homeTeam} onChange={(e) => setWinner(e.target.value)} />
          {homeTeam}
        </label>
      </div>
      <div className="team-scores">
        {homeScore} - {awayScore}
      </div>
      <div className="game-time">
        {formattedDate} {formattedTime}
      </div>
    </div>
  );
};

export default Game;
