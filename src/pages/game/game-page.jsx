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
  const [game, setGame] = useState(null);
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
    socket.register(gid, pid, data => {
      console.log('Got a message from the server', data);
      if (data.error) {
        setPlayerId(undefined);
        errorCallback(data);
      } else {
        setPlayerId(pid);
        setGame(data.game);
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
        setGame(res);
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
              <StoryTitleSection
                value={(game && game.title) || ''}
                onChange={e => socket.updateTitle(e.target.value)}
              />
              <hr />
              <div className="buttons">
                <button className="button is-danger" onClick={socket.reset}>
                  Clear Votes
                </button>
                <button className="button is-info" onClick={socket.showVotes}>
                  Show Votes
                </button>
              </div>
              <hr />
              <VotingButtons onSelected={points => vote(points)} />
              <div className="columns">
                <div className="column">
                  <PlayersTable me={playerId} players={game.players} showVotes={game.showVotes} />
                </div>
                <div className="column">
                  <GameStats players={game.players} />
                </div>
              </div>
            </Fragment>
          )}
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
