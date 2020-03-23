const express = require('express');
const router = express.Router();
import { games } from '../../state';

export function getSocketRouter(expressWs) {
  router.ws('/poker', function(ws) {
    ws.on('message', function(msg) {
      let message = JSON.parse(msg);
      let game = games[message.gameId];

      if (message.action === 'join') {
        // TODO: add the user to the game
        // FIXME: they are already there because of POST
        ws.gameId = game.id;
        ws.send(
          JSON.stringify({
            game: game
          })
        );
      } else if (message.action === 'vote') {
        // find the user and update their vote
        game.players.find(player => player.name === message.playerId).points = message.points;
      } else {
        // fallback
        console.log('got message', message);
        ws.send(message);
      }

      broadcastGameUpdate(game);
    });
  });

  function broadcastGameUpdate(game) {
    expressWs.getWss('/socket/poker').clients.forEach(client => {
      if (client.gameId === game.id) {
        client.send(JSON.stringify({ game }));
      }
    });
  }

  return router;
}
