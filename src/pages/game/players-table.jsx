import React from 'react';

export function PlayersTable({ players }) {
  if (players.length === 0) {
    return <div>There&apos;s no one here right now</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Points</td>
        </tr>
      </thead>
      <tbody>
        {players.map(player => (
          <tr key={player.name}>
            <td>{player.name}</td>
            <td>{player.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
