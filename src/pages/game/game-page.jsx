import React, { useEffect, useState } from 'react';
import { AddPlayer } from '../../components/add-player';
import { GameTitle } from './game-title';
import { GameNotFound } from './game-not-found';
import { ActiveGame } from './active-game';
import { Loading } from '../../loading/loading';

export default function GamePage({ match }) {
  const [playerInfo, setPlayerInfo] = useState(null);
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
    <div data-testid="game-page">
      <GameTitle gameId={gameId} />
      <div className="columns">
        {!playerInfo && (
          <div className="column">
            <div className="hero">
              <div className="hero-body">
                <AddPlayer
                  type="game"
                  id={gameId}
                  onSubmit={playerInfo => {
                    setPlayerInfo(playerInfo);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {playerInfo && <ActiveGame playerId={playerInfo.playerId} gameId={gameId} emailHash={playerInfo.emailHash} />}
      </div>
    </div>
  );
}
