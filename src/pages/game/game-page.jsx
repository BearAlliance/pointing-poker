import React, { useEffect, useState } from 'react';
import { AddPlayer } from './add-player';
import { GameTitle } from './game-title';
import { PlayersTable } from './players-table';
import { GameNotFound } from './game-not-found';

export default function GamePage({ match }) {
  const [playerId, setPlayerId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    setPlayerId(null);
    getGameData(match.params.gameId);
    setGameId(match.params.gameId);
  }, [match]);

  function getGameData(currentGameId) {
    fetch(`/api/game/${currentGameId}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(res => {
        setHasError(false);
        setGameId(res.id);
        setPlayers(res.players);
      })
      .catch(() => {
        setHasError(true);
      });
  }

  if (hasError) {
    return <GameNotFound />;
  }

  return (
    <div>
      <div className="columns">
        <div className="column">
          <GameTitle gameId={gameId} />
          <PlayersTable players={players} />
        </div>

        <div className="column">
          {!playerId && (
            <div className="hero">
              <div className="hero-body">
                <AddPlayer
                  gameId={gameId}
                  onComplete={newPlayerId => {
                    setPlayerId(newPlayerId);
                    getGameData(gameId);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
