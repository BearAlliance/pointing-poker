import React, { Fragment, useEffect, useState } from 'react';
import { AddPlayer } from './add-player';
import { GameTitle } from './game-title';
import { PlayersTable } from './players-table';
import { GameNotFound } from './game-not-found';
import { VotingButtons } from './voting-buttons';
import { StoryTitleSection } from './story-title-section';
import { PokerSocket } from '../../websocket-client';

export default function GamePage({ match }) {
  const [playerId, setPlayerId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [socket] = useState(new PokerSocket());

  useEffect(() => {
    setPlayerId(null);
    getGameData(match.params.gameId);
    setGameId(match.params.gameId);
  }, [match]);

  function connectWebSocket(pid, gid) {
    socket.register(gid, pid, data => {
      console.log('Got a message from the server', data);
      setPlayers(data.game.players);
    });
  }

  function vote(points) {
    socket.vote(points);
  }

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
          {playerId && (
            <Fragment>
              <StoryTitleSection />
              <VotingButtons onSelected={points => vote(points)} />
            </Fragment>
          )}
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
                    connectWebSocket(newPlayerId, gameId);
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
