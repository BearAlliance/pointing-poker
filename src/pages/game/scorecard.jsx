import React from 'react';
import { PlayersTable } from './players-table';
import { ObserversTable } from './observers-table';
import { GameStats } from './game-stats';

export function Scorecard({ game, me }) {
  return (
    <div className="columns">
      <div className="column">
        <PlayersTable me={me} game={game} />
        <ObserversTable players={game.players} me={me} />
      </div>
      <div className="column">
        <GameStats game={game} />
      </div>
    </div>
  );
}
