import React from 'react';

export function PlayersTable({ players, me, showVotes }) {
  function hasEveryoneVoted() {
    return players.every(player => player.points >= 0);
  }

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
                {player.name}
                {player.name === me && <span> (you)</span>}
              </td>
              <td className="has-text-weight-bold">
                {hasEveryoneVoted() || player.name === me || showVotes ? player.points : '--'}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
