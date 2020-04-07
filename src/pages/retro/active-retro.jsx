import React, { Fragment, useContext, useEffect, useState } from 'react';
import get from 'lodash.get';
import { COLUMN_TYPES, RetroColumn } from './retro-column';
import { RetroSocket } from '../../websocket-client';
import { InviteLink } from '../../components/invite-link';
import { SocketDisconnectWarning } from '../../components/socket-disconnect-warning';
import { ParticipantContext } from '../../contexts/participant-context';
import { RetroParticipants } from './retro-participants';

let socket;

export function ActiveRetro({ playerName, emailHash, retroId }) {
  const { setParticipants } = useContext(ParticipantContext);
  const [retro, setRetro] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket = new RetroSocket(retroId, playerName, 'retro', {
      onMessage: data => {
        if (data.error) {
          setError(true);
        } else {
          setRetro(data.retro);
          setParticipants(data.retro.players);
        }
      },
      onClose: () => setError(true)
    });
    socket.connect(emailHash);
    return function cleanup() {
      socket.disconnect();
    };
  }, [emailHash, playerName, retroId, setParticipants]);

  console.log('retro', retro);

  if (retro)
    return (
      <Fragment>
        {error && <SocketDisconnectWarning />}
        {retro.players.length === 1 && (
          <div className="notification is-info is-light">
            You look lonely. Invite some friends with this link:{' '}
            <InviteLink id={retroId} type="retro" showHref={true} />{' '}
          </div>
        )}
        <div className="container">
          <RetroParticipants />
        </div>
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
              onLikeItem={id => socket.likeItem(id)}
              onUnlikeItem={id => socket.unlikeItem(id)}
              items={get(retro, `columns.${COLUMN_TYPES.STOP_DOING}`, [])}
            />{' '}
          </div>
          <div className="column">
            <RetroColumn
              type={COLUMN_TYPES.START_DOING}
              myPlayerId={playerName}
              addItem={text => socket.addItem(text, COLUMN_TYPES.START_DOING)}
              removeItem={id => socket.removeItem(id)}
              onLikeItem={id => socket.likeItem(id)}
              onUnlikeItem={id => socket.unlikeItem(id)}
              items={get(retro, `columns.${COLUMN_TYPES.START_DOING}`, [])}
            />{' '}
          </div>
        </div>
      </Fragment>
    );

  return null;
}
