import { games } from '../state';

const express = require('express');
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

function addUserToGame(req, res) {
  const { name } = req.params;

  req.game.users.push({ name });
  res.status(201).json(req.game);
}

router.post('/game/create/:nameOfCreator', (req, res) => {
  const newGameId = getNewGameId();

  games[newGameId] = {
    started: true,
    startTime: new Date().getTime(),
    users: [
      {
        name: req.params.nameOfCreator
      }
    ]
  };

  res.json(games[newGameId]);
});

router.post('/game/addUser/:gameId/:name', getGame, addUserToGame);

router.get('/game/:gameId', function(req, res) {
  res.json({ id: req.params.gameId });
});

module.exports = router;
