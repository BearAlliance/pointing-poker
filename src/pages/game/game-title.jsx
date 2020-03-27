import React, { Fragment } from 'react';
import { InviteLink } from './invite-link';

export function GameTitle({ gameId }) {
  return (
    <Fragment>
      <div className="hero is-hidden-touch">
        <div className="hero-body">
          <h1 className="is-size-3">
            Planning Poker <InviteLink gameId={gameId} />{' '}
          </h1>
        </div>
      </div>
      <div className="is-hidden-desktop is-size-4">
        Planning Poker <InviteLink gameId={gameId} />
      </div>
    </Fragment>
  );
}
