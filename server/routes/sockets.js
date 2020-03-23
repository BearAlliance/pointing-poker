const express = require('express');
const router = express.Router();
import { games } from '../../state';

export function getSocketRouter(expressWs) {
  console.log('registered websocket serverside route');

  router.ws('/echo', function(ws /*, req */) {
    ws.on('message', function(msg) {
      let message = JSON.parse(msg);
      let game = games[message.gameId];

      if (message.action === 'join') {
        // add the user to the game
        // TODO: they are already there because of POST
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

      // send game update to everyone
      // TODO: only send it to the clients that are in THIS game
      expressWs.getWss('/socket/echo').clients.forEach(client => {
        client.send(
          JSON.stringify({
            game: game
          })
        );
      });
    });
  });

  return router;
}
