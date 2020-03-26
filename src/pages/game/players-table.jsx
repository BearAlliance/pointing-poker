import React from 'react';
import classNames from 'classnames';
import { hasEveryoneVoted } from './player-stats';

export function PlayersTable({ players, me, showVotes }) {
  if (players.length === 0) {
    return <div>There&apos;s no one here right now</div>;
  }

  return (
    <div className="box">
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {players
            .filter(player => !player.isGuest)
            .map(player => (
              <tr key={player.name}>
                <td className={classNames({ 'has-background-success': player.points !== undefined })}>
                  {player.name}
                  {player.name === me && <span> (you)</span>}
                </td>
                <td className="has-text-weight-bold">
                  {hasEveryoneVoted(players) || player.name === me || showVotes ? player.points : '--'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
