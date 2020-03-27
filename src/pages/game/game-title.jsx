import React, { Fragment } from 'react';

export function GameTitle({ gameId }) {
  return (
    <Fragment>
      <div className="hero is-hidden-touch">
        <div className="hero-body">
          <h1 className="is-size-3">Planning Poker #{gameId}</h1>
        </div>
      </div>
      <div className="is-hidden-desktop is-size-4">Planning Poker #{gameId}</div>
    </Fragment>
  );
}
