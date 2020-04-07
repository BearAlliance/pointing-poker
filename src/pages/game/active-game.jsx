import React, { Fragment, useEffect, useState } from 'react';
import { InviteLink } from '../../components/invite-link';
import { Scorecard } from './scorecard';
import { StoryTitleSection } from './story-title-section';
import { VotingButtons } from './voting-buttons';
import { PokerSocket } from '../../websocket-client';
import { ObserverSwitch } from './observer-switch';
import { SocketDisconnectWarning } from '../../components/socket-disconnect-warning';

let socket;

export function ActiveGame({ playerId, gameId, emailHash }) {
  const [game, setGame] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [error, setError] = useState(null);

  function vote(points) {
    socket.vote(points);
  }

  useEffect(() => {
    socket = new PokerSocket(gameId, playerId, 'poker', {
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
    socket.connect(emailHash);
    return function cleanup() {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId]);

  if (!game) {
    return null;
  }

  function toggleVotes() {
    if (game.showVotes) {
      socket.hideVotes();
    } else {
      socket.showVotes();
    }
  }

  return (
    <Fragment>
      <div className="column is-one-third">
        {error && <SocketDisconnectWarning />}
        <Fragment>
          <StoryTitleSection value={(game && game.title) || ''} onChange={e => socket.updateTitle(e.target.value)} />
          <hr />
          <div className="buttons">
            <button className="button is-warning" onClick={() => socket.resetVotes()}>
              Clear Votes
            </button>
            <button className="button is-info" onClick={toggleVotes}>
              {game.showVotes ? 'Hide Votes' : 'Show Votes'}
            </button>
          </div>
          <hr />
          {!isGuest && <VotingButtons onSelected={points => vote(points)} />}
        </Fragment>
      </div>
      <div className="column">
        {game.players.length === 1 && (
          <div className="notification is-info is-light">
            You look lonely. Invite some friends with this link: <InviteLink id={gameId} type="game" showHref={true} />{' '}
          </div>
        )}
        <Scorecard players={game.players} me={playerId} showVotes={game.showVotes} />
        <ObserverSwitch socket={socket} onChange={newValue => setIsGuest(newValue)} />
      </div>
    </Fragment>
  );
}
