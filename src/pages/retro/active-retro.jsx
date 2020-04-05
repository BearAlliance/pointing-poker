import React, { Fragment, useEffect, useState } from 'react';
import get from 'lodash.get';
import { COLUMN_TYPES, RetroColumn } from './retro-column';
import { RetroSocket } from '../../websocket-client';
import { InviteLink } from '../../components/invite-link';

let socket;

export function ActiveRetro({ playerName, retroId }) {
  const [retro, setRetro] = useState(null);

  useEffect(() => {
    socket = new RetroSocket(retroId, playerName, 'retro', {
      onMessage: data => {
        setRetro(data.retro);
      },
      onClose: () => console.log('closing')
    });
    socket.connect();
    return function cleanup() {
      socket.disconnect();
    };
  }, [playerName, retroId]);

  console.log('retro', retro);

  if (retro)
    return (
      <Fragment>
        {retro.players.length === 1 && (
          <div className="notification is-info is-light">
            You look lonely. Invite some friends with this link:{' '}
            <InviteLink id={retroId} type="retro" showHref={true} />{' '}
          </div>
        )}
        {retro.players.length > 1 && <div>Participants: {retro.players.map(player => player.name).join(', ')}</div>}
        <div className="columns">
          <div className="column">
            <RetroColumn
              type={COLUMN_TYPES.KEEP_DOING}
              myPlayerId={playerName}
              addItem={text => socket.addItem(text, COLUMN_TYPES.KEEP_DOING)}
              removeItem={id => socket.removeItem(id)}
              onLikeItem={id => socket.likeItem(id)}
              onUnlikeItem={id => socket.unlikeItem(id)}
              items={get(retro, `columns.${COLUMN_TYPES.KEEP_DOING}`, [])}
            />
          </div>
          <div className="column">
            <RetroColumn
              type={COLUMN_TYPES.STOP_DOING}
              myPlayerId={playerName}
              addItem={text => socket.addItem(text, COLUMN_TYPES.STOP_DOING)}
              removeItem={id => socket.removeItem(id)}
              voteForItem={id => socket.voteForItem(id)}
              items={get(retro, `columns.${COLUMN_TYPES.STOP_DOING}`, [])}
            />{' '}
          </div>
          <div className="column">
            <RetroColumn
              type={COLUMN_TYPES.START_DOING}
              myPlayerId={playerName}
              addItem={text => socket.addItem(text, COLUMN_TYPES.START_DOING)}
              removeItem={id => socket.removeItem(id)}
              voteForItem={id => socket.voteForItem(id)}
              items={get(retro, `columns.${COLUMN_TYPES.START_DOING}`, [])}
            />{' '}
          </div>
        </div>
      </Fragment>
    );

  return null;
}
