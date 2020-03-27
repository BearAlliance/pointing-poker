import express from 'express';
import { games } from '../state';

const router = express.Router();

function padZeros(int, desiredLength) {
  if (int.toString().length < desiredLength) {
    return padZeros(`0${int.toString()}`, desiredLength);
  }
  return int;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getNewGameId() {
  let newGameId = padZeros(getRandomInt(9999), 4);

  while (games[newGameId]) {
    newGameId = padZeros(getRandomInt(9999), 4);
  }

  return newGameId;
}

function getGame(req, res, next) {
  const { gameId } = req.params;

  const game = games[gameId];

  if (!game) {
    res.status(404).send('Not Found');
  } else {
    req.game = game;
    next();
  }
}

function sendGameInfo(req, res) {
  res.json(req.game);
}

router.post('/game/create', (req, res) => {
  const newGameId = getNewGameId();

  games[newGameId] = {
    id: newGameId,
    started: true,
    startTime: new Date().getTime(),
    players: []
  };

  console.log(`created game ${newGameId}`);

  res.json(games[newGameId]);
});

router.get('/game/:gameId', getGame, sendGameInfo);

export const gamesRouter = router;
