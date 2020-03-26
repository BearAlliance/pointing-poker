import React from 'react';
import { PlayersTable } from './players-table';
import { ObserversTable } from './observers-table';
import { GameStats } from './game-stats';

export function Scorecard({ players, me, showVotes }) {
  return (
    <div className="columns">
      <div className="column">
        <PlayersTable me={me} players={players} showVotes={showVotes} />
        <ObserversTable players={players} me={me} />
      </div>
      <div className="column">
        <GameStats players={players} />
      </div>
    </div>
  );
}
