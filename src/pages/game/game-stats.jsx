import React from 'react';
import { hasEveryoneVoted } from './player-stats';
import { PointDefenderInfo } from './point-defender-info';

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

    return {
      max,
      highPeople
    };
  }

  function getHighPeopleText() {
    let { max, highPeople } = getHighPeople();
    return `${max} by ${highPeople.map(p => p.name).join(', ')}`;
  }

  function getLowPeople() {
    let allPoints = players.map(p => p.points || +Infinity);
    let min = Math.min(...allPoints);

    let lowPeople = players.filter(player => {
      return player.points === min;
    });

    return {
      min,
      lowPeople
    };
  }

  function getLowPeopleText() {
    let { min, lowPeople } = getLowPeople();
    return `${min} by ${lowPeople.map(p => p.name).join(', ')}`;
  }

  function defenderInfo() {
    let { max, highPeople } = getHighPeople();
    let { min, lowPeople } = getLowPeople();

    return {
      lowPeople,
      highPeople,
      max,
      min
    };
  }

  if (!hasEveryoneVoted(players)) {
    return '';
  }

  return (
    <div>
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
            <td>{getAveragePoints()}</td>
          </tr>
          <tr>
            <td>High</td>
            <td>{getHighPeopleText()}</td>
          </tr>
          <tr>
            <td>Low</td>
            <td>{getLowPeopleText()}</td>
          </tr>
        </tbody>
      </table>
      <PointDefenderInfo info={defenderInfo()}></PointDefenderInfo>
    </div>
  );
}
