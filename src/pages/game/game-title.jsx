import React, { Fragment } from 'react';
import { isDevelopment } from '../../env';

function gameLink(gameId) {
  const href = isDevelopment()
    ? `http://${window.location.host}/game/${gameId}`
    : `https://${window.location.host}/game/${gameId}`;
  return <a href={href}>#{gameId}</a>;
}

export function GameTitle({ gameId }) {
  return (
    <Fragment>
      <div className="hero is-hidden-touch">
        <div className="hero-body">
          <h1 className="is-size-3">Planning Poker {gameLink(gameId)}</h1>
        </div>
      </div>
      <div className="is-hidden-desktop is-size-4">Planning Poker {gameLink(gameId)}</div>
    </Fragment>
  );
}
