import React from 'react';

export function PlayersTable({ players }) {
  if (players.length === 0) {
    return <div>There&apos;s no one here right now</div>;
  }

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
    <div>
      <div className="columns">
        <div className="column">
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
        </div>
        <div className="column">
          <table className="table">
            <tr>
              <td>Average</td>
              <td>{getAveragePoints()}</td>
            </tr>
            <tr>
              <td>High</td>
              <td>{getHighPeople()}</td>
            </tr>
            <tr>
              <td>Low</td>
              <td>{getLowPeople()}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
