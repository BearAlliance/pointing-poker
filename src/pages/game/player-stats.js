export function hasEveryoneVoted(players) {
  return players.filter(player => !player.isGuest).every(player => player.points !== undefined);
}
