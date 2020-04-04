import React, { Fragment } from 'react';
import { InviteLink } from '../../components/invite-link';

export function RetroTitle({ retroId }) {
  return (
    <Fragment>
      <div className="hero is-hidden-touch" data-testid="game-title">
        <div className="hero-body">
          <h1 className="is-size-3">
            Retrospective <InviteLink id={retroId} type="retro" />
          </h1>
        </div>
      </div>
      <div className="is-hidden-desktop is-size-4">
        Retrospective <InviteLink id={retroId} type="retro" />
      </div>
    </Fragment>
  );
}
