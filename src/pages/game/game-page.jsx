import React, { Fragment, useEffect, useState } from 'react';
import { AddPlayer } from './add-player';
import { GameTitle } from './game-title';
import { PlayersTable } from './players-table';
import { GameNotFound } from './game-not-found';
import { VotingButtons } from './voting-buttons';
import { StoryTitleSection } from './story-title-section';
import { WebSocketClient } from '../../websocket-client';
import { GameStats } from './game-stats';

export default function GamePage({ match }) {
  const [playerId, setPlayerId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [socket] = useState(new WebSocketClient());

  useEffect(() => {
    setPlayerId(null);
    getGameData(match.params.gameId);
    setGameId(match.params.gameId);
  }, [match]);

  function vote(points) {
    socket.vote(points);
  }

  function joinGame(pid, gid, errorCallback) {
    setPlayerId(pid);
    setGameId(gid);

    socket.register(gid, pid, data => {
      console.log('Got a message from the server', data);
      if (data.error) {
        errorCallback(data);
      } else {
        setPlayers(data.game.players);
      }
    });
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
          <div>
            <div className="columns">
              <div className="column">
                <PlayersTable players={players} />
              </div>
              <div className="column">
                <GameStats players={players} />
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          {!playerId && (
            <div className="hero">
              <div className="hero-body">
                <AddPlayer gameId={gameId} joinGame={joinGame} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
