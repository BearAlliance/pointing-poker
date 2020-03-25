import React from 'react';

export function PlayersTable({ players }) {
  if (players.length === 0) {
    return <div>There&apos;s no one here right now</div>;
  }

  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th>Voted</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {players.map(player => (
          <tr key={player.name}>
            <td>{player.points ? <i className="fas fa-check has-text-success" /> : null}</td>
            <td>{player.name}</td>
            <td className="has-text-weight-bold">{player.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
