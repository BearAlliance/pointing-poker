import React, { useEffect, useState } from 'react';
import { AddPlayer } from './add-player';
import { GameTitle } from './game-title';
import { GameNotFound } from './game-not-found';
import { ActiveGame } from './active-game';
import { Loading } from '../../loading/loading';

export default function GamePage({ match }) {
  const [playerId, setPlayerId] = useState(null);
  const [isGuest, setIsGuest] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      .then(() => {
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (hasError) {
    return <GameNotFound />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <GameTitle gameId={gameId} />
      <div className="columns">
        {!playerId && (
          <div className="column">
            <div className="hero">
              <div className="hero-body">
                <AddPlayer
                  gameId={gameId}
                  onSubmit={(playerId, isGuest) => {
                    setPlayerId(playerId);
                    setIsGuest(isGuest);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {playerId && <ActiveGame playerId={playerId} gameId={gameId} isGuest={isGuest} />}
      </div>
    </div>
  );
}
