function padZeros(int, desiredLength) {
  if (int.toString().length < desiredLength) {
    return padZeros(`0${int.toString()}`, desiredLength);
  }
  return int;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getNewGameId(sessions) {
  let newGameId = padZeros(getRandomInt(9999), 4);

  while (sessions[newGameId]) {
    newGameId = padZeros(getRandomInt(9999), 4);
  }

  return newGameId;
}
