import React from 'react';
import { hasEveryoneVoted } from './game-stats';

export function PlayersTable({ players, me, showVotes }) {
  if (players.length === 0) {
    return <div>There&apos;s no one here right now</div>;
  }

  return (
    <table className="table is-striped">
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
              <td>
                {player.points && <span className="has-text-success">|</span>}
                {player.name === me ? <i className="fas fa-arrow-right" /> : null}
                {player.name}
              </td>
              <td className="has-text-weight-bold">
                {hasEveryoneVoted(players) || player.name === me || showVotes ? player.points : '--'}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
