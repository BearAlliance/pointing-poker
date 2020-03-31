import React, { Fragment } from 'react';
import { hasEveryoneVoted } from './player-stats';
import { PointDefenderInfo } from './point-defender-info';

export function GameStats({ players }) {
  const playersThatPointed = getVotedWithPoints();

  function getVotedWithPoints() {
    return players.filter(player => {
      return player.points && player.points !== '?';
    });
  }

  function getAveragePoints() {
    const total = playersThatPointed.reduce((accum, curr) => {
      return accum + curr.points;
    }, 0);

    if (getVotedWithPoints().length === 0) {
      return 'N/A';
    } else {
      return `${Math.round(total / getVotedWithPoints().length)} Points`;
    }
  }

  function getHighPeople() {
    let allPoints = playersThatPointed.map(p => p.points);
    let max = Math.max(...allPoints);

    let highPeople = playersThatPointed.filter(player => {
      return player.points === max;
    });

    return {
      max,
      highPeople
    };
  }

  function getLowPeople() {
    let allPoints = playersThatPointed.map(p => p.points);
    let min = Math.min(...allPoints);

    let lowPeople = playersThatPointed.filter(player => {
      return player.points === min;
    });

    return {
      min,
      lowPeople
    };
  }

  function getHighPeopleText() {
    let { max, highPeople } = getHighPeople();
    if (highPeople.length > 0) {
      return `${max} by ${highPeople.map(p => p.name).join(', ')}`;
    } else {
      return 'N/A';
    }
  }

  function getLowPeopleText() {
    let { min, lowPeople } = getLowPeople();
    if (lowPeople.length > 0) {
      return `${min} by ${lowPeople.map(p => p.name).join(', ')}`;
    } else {
      return 'N/A';
    }
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

  return (
    <Fragment>
      <article className="box">
        <div className="message-header">
          <p>Game Stats</p>
        </div>
        <div className="message-body">
          <table className="table">
            <tbody>
              <tr>
                <td>Average</td>
                <td>{hasEveryoneVoted(players) ? getAveragePoints() : '--'}</td>
              </tr>
              <tr>
                <td>High</td>
                <td>{hasEveryoneVoted(players) ? getHighPeopleText() : '--'}</td>
              </tr>
              <tr>
                <td>Low</td>
                <td>{hasEveryoneVoted(players) ? getLowPeopleText() : '--'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
      {hasEveryoneVoted(players) && <PointDefenderInfo info={defenderInfo()} />}
    </Fragment>
  );
}
