import React from 'react';
import './Game.css';

const Game = ({ game }) => {
  const homeTeam = game.strHomeTeam;
  const awayTeam = game.strAwayTeam;
  const homeScore = game.intHomeScore;
  const awayScore = game.intAwayScore;
  const date = game.dateEvent;
  const time = game.strTime;

  return (
    <div className="game">
      <div className="team-names">
        <span>{homeTeam}</span> vs <span>{awayTeam}</span>
      </div>
      <div className="team-scores">
        {homeScore} - {awayScore}
      </div>
      <div className="game-time">
        {date} {time}
      </div>
    </div>
  );
};

export default Game;
