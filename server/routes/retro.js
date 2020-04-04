import { retros } from '../state';
import express from 'express';
import { getNewGameId } from '../helpers/game-id';

const router = express.Router();

function getRetro(req, res, next) {
  const { retroId } = req.params;

  const retro = retros[retroId];

  if (!retro) {
    res.status(404).send('Not Found');
  } else {
    req.retro = retro;
    next();
  }
}

function sendRetroInfo(req, res) {
  res.json(req.retro);
}

function notFound(req, res) {
  res.status(404).send();
}

function isNameAvailable(req, res) {
  res.json({ available: !req.retro.players.map(player => player.name).includes(req.params.playerName) });
}

router.post('/create', (req, res) => {
  const newSessionId = getNewGameId(retros);

  retros[newSessionId] = {
    id: newSessionId,
    started: true,
    startTime: new Date().getTime(),
    players: [],
    columns: {}
  };

  console.log(`created retro ${newSessionId}`);

  res.json(retros[newSessionId]);
});

router.get('/:retroId', getRetro, sendRetroInfo);

router.get('/:retroId/:playerName/available', getRetro, isNameAvailable);

router.get('*', notFound);

export const retroRouter = router;
