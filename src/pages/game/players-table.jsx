import React from 'react';
import classNames from 'classnames';
import { hasEveryoneVoted } from './player-stats';
import { VOTING_TYPE, getDisplayValue } from './voting-choices';

export function PlayersTable({ game, me }) {
  if (game.players.length === 0) {
    return <div>There&apos;s no one here right now</div>;
  }

  function showPoints(player) {
    if (player.points === undefined) return undefined;

    if (game.votingType === VOTING_TYPE.FIBONACCI) {
      return player.points;
    } else {
      return getDisplayValue(game.votingType, player.points);
    }
  }

  return (
    <div className="box">
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>{game.votingType === VOTING_TYPE.FIBONACCI ? ' Points' : ' Sizing'}</th>
          </tr>
        </thead>
        <tbody>
          {game.players
            .filter(player => !player.isGuest)
            .map(player => (
              <tr key={player.name}>
                <td className={classNames({ 'has-background-success': player.points !== undefined })}>
                  {player.name}
                  {player.name === me && <span> (you)</span>}
                </td>
                <td className="has-text-weight-bold">
                  {hasEveryoneVoted(game.players) || player.name === me || game.showVotes ? showPoints(player) : '--'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
