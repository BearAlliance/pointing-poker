import express from 'express';
import { games } from '../state';

const router = express.Router();

function countGames(req, res) {
  const gamesCount = Object.keys(games).filter(gameKey => games[gameKey].players.length > 0).length;

  res.json({ count: gamesCount });
}

router.get('/in-progress/count', countGames);

export const gamesRouter = router;
