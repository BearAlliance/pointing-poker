import express from 'express';
import { games } from '../state';
import { getNewGameId } from '../helpers/game-id';

const router = express.Router();

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

function isNameAvailable(req, res) {
  res.json({ available: !req.game.players.map(player => player.name).includes(req.params.playerId) });
}

router.post('/create', (req, res) => {
  const newGameId = getNewGameId(games);

  games[newGameId] = {
    id: newGameId,
    started: true,
    startTime: new Date().getTime(),
    players: []
  };

  console.log(`created game ${newGameId}`);

  res.json(games[newGameId]);
});

router.get('/:gameId', getGame, sendGameInfo);

router.get('/:gameId/:playerId/available', getGame, isNameAvailable);

export const gameRouter = router;
