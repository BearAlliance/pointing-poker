import React from 'react';
import { hasEveryoneVoted } from './player-stats';

export function GameStats({ players }) {
  // only count people that voted
  function getAveragePoints() {
    const total = players.reduce((accum, curr) => {
      let points = curr.points ? curr.points : 0;
      return accum + points;
    }, 0);

    const playersThatVoted = players.reduce((accum, p) => {
      if (p.points) return accum + 1;
      return accum;
    }, 0);

    if (playersThatVoted === 0) {
      return 'N/A';
    } else {
      return `${Math.round(total / playersThatVoted)} Points`;
    }
  }

  function getHighPeople() {
    let allPoints = players.map(p => p.points || -Infinity);
    let max = Math.max(...allPoints);

    let highPeople = players.filter(player => {
      return player.points === max;
    });
    return `${max} by ${highPeople.map(p => p.name)}`;
  }

  function getLowPeople() {
    let allPoints = players.map(p => p.points || +Infinity);
    let min = Math.min(...allPoints);

    let lowPeople = players.filter(player => {
      return player.points === min;
    });
    return `${min} by ${lowPeople.map(p => p.name)}`;
  }

  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th colSpan="2" className="has-text-centered">
            Stats
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Average</td>
          <td>{hasEveryoneVoted(players) ? getAveragePoints() : '--'}</td>
        </tr>
        <tr>
          <td>High</td>
          <td>{hasEveryoneVoted(players) ? getHighPeople() : '--'}</td>
        </tr>
        <tr>
          <td>Low</td>
          <td>{hasEveryoneVoted(players) ? getLowPeople() : '--'}</td>
        </tr>
      </tbody>
    </table>
  );
}
