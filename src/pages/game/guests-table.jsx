import React from 'react';

export function GuestsTable({ players }) {
  if (players.length === 0) {
    return null;
  }

  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th>Guests</th>
        </tr>
      </thead>
      <tbody>
        {players
          .filter(player => player.isGuest)
          .map(player => (
            <tr key={player.name}>
              <td>{player.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
