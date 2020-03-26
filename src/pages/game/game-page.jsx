import React, { Fragment, useEffect, useState } from 'react';
import { AddPlayer } from './add-player';
import { GameTitle } from './game-title';
import { GameNotFound } from './game-not-found';
import { VotingButtons } from './voting-buttons';
import { StoryTitleSection } from './story-title-section';
import { WebSocketClient } from '../../websocket-client';
import { Scorecard } from './scorecard';

export default function GamePage({ match }) {
  const [playerId, setPlayerId] = useState(null);
  const [isGuest, setIsGuest] = useState(null);
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

  function joinGame(pid, isGuest, gid, errorCallback) {
    setIsGuest(isGuest);
    socket.register(gid, isGuest, pid, data => {
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
      <GameTitle gameId={gameId} />
      <div className="columns">
        <div className="column is-one-third">
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
              {!isGuest && <VotingButtons onSelected={points => vote(points)} />}
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
          {playerId && <Scorecard players={game.players} me={playerId} showVotes={game.showVotes} />}
        </div>
      </div>
    </div>
  );
}
