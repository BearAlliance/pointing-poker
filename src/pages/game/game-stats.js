export function hasEveryoneVoted(players) {
  return players.every(player => player.points >= 0);
}
