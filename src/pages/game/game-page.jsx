import React, { useEffect, useState } from 'react';
import { AddPlayer } from './add-player';

export default function GamePage({ match }) {
  const [playerId, setPlayerId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayerId(null);
    getGameData(match.params.gameId);
    setGameId(match.params.gameId);
  }, [match]);

  function getGameData(currentGameId) {
    fetch(`/api/game/${currentGameId}`)
      .then(res => res.json())
      .then(res => {
        console.log('game page', res.id);
        setGameId(res.id);
        setPlayers(res.players);
      });
  }

  return (
    <div>
      <div className="hero">
        <div className="hero-body">
          <h1 className="title">Game {gameId}</h1>
        </div>
      </div>

      {!playerId && (
        <AddPlayer
          gameId={gameId}
          onComplete={newPlayerId => {
            setPlayerId(newPlayerId);
            getGameData(gameId);
          }}
        />
      )}

      <div className="columns">
        <div className="column" />
        <div className="column">
          <table className="table">
            <thead>
              <tr>
                <td>Name</td>
                <td>Points</td>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.name}>
                  <td>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column" />
      </div>
    </div>
  );
}
