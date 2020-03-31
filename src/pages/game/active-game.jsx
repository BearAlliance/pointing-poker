import React, { Fragment, useEffect, useState } from 'react';
import { InviteLink } from './invite-link';
import { Scorecard } from './scorecard';
import { StoryTitleSection } from './story-title-section';
import { VotingButtons } from './voting-buttons';
import { WebSocketClient } from '../../websocket-client';
import { ObserverSwitch } from './observer-switch';

let socket;

export function ActiveGame({ playerId, gameId }) {
  const [game, setGame] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [error, setError] = useState(null);

  function vote(points) {
    socket.vote(points);
  }

  useEffect(() => {
    socket = new WebSocketClient();
    socket.register(gameId, playerId, {
      onMessage: data => {
        if (data.error) {
          setError(true);
        } else {
          setError(false);
          setGame(data.game);
        }
      },
      onClose: () => setError(true),
      onError: () => setError(true)
    });
    return function cleanup() {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId]);

  if (!game) {
    return null;
  }

  return (
    <Fragment>
      <div className="column is-one-third">
        {error && (
          <div className="notification is-danger">
            <button className="delete" onClick={() => setError(false)} />
            Socket connection lost. Please refresh the page
          </div>
        )}
        <Fragment>
          <StoryTitleSection value={(game && game.title) || ''} onChange={e => socket.updateTitle(e.target.value)} />
          <hr />
          <div className="buttons">
            <button className="button is-warning" onClick={() => socket.resetVotes()}>
              Clear Votes
            </button>
            <button className="button is-info" onClick={() => socket.showVotes()}>
              Show Votes
            </button>
          </div>
          <hr />
          {!isGuest && <VotingButtons onSelected={points => vote(points)} />}
        </Fragment>
      </div>
      <div className="column">
        {game.players.length === 1 && (
          <div className="notification is-info is-light">
            You look lonely. Invite some friends with this link: <InviteLink gameId={gameId} showHref={true} />{' '}
          </div>
        )}
        <Scorecard players={game.players} me={playerId} showVotes={game.showVotes} />
        <ObserverSwitch socket={socket} onChange={newValue => setIsGuest(newValue)} />
      </div>
    </Fragment>
  );
}
