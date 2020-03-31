import React, { Fragment, useEffect, useState } from 'react';
import { InviteLink } from './invite-link';
import { Scorecard } from './scorecard';
import { StoryTitleSection } from './story-title-section';
import { VotingButtons } from './voting-buttons';
import { WebSocketClient } from '../../websocket-client';

export function ActiveGame({ playerId, gameId, isGuest }) {
  const [game, setGame] = useState(null);
  const [socket] = useState(new WebSocketClient());

  function vote(points) {
    socket.vote(points);
  }

  useEffect(() => {
    socket.register(gameId, isGuest, playerId, data => {
      console.log('Got a message from the server', data);
      if (!data.error) {
        setGame(data.game);
      }
    });
    return function cleanup() {
      socket.disconnect();
    };
  }, [playerId, gameId]);

  if (!game) {
    return null;
  }

  return (
    <Fragment>
      <div className="column is-one-third">
        <Fragment>
          <StoryTitleSection value={(game && game.title) || ''} onChange={e => socket.updateTitle(e.target.value)} />
          <hr />
          <div className="buttons">
            <button className="button is-warning" onClick={socket.reset}>
              Clear Votes
            </button>
            <button className="button is-info" onClick={socket.showVotes}>
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
      </div>
    </Fragment>
  );
}
