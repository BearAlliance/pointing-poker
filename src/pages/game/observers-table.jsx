import React from 'react';

export function ObserversTable({ players, me }) {
  if (players.length === 0) {
    return null;
  }

  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th>Observers</th>
        </tr>
      </thead>
      <tbody>
        {players
          .filter(player => player.isGuest)
          .map(player => (
            <tr key={player.name}>
              <td>
                {player.name}
                {player.name === me && <span> (you)</span>}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
