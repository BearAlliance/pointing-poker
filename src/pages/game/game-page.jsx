import React, { useEffect, useState } from 'react';
import { AddPlayer } from './add-player';
import { GameTitle } from './game-title';
import { PlayersTable } from './players-table';

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
      <GameTitle gameId={gameId} />

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
          <PlayersTable players={players} />
        </div>
        <div className="column" />
      </div>
    </div>
  );
}
