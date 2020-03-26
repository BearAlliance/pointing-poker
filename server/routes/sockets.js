const express = require('express');
const router = express.Router();
import { games } from '../state';

function isNameAvailable(name, players = []) {
  return (
    players.find(p => {
      return p.name === name;
    }) === undefined
  );
}

export function getSocketRouter(expressWs) {
  router.ws('/poker', function(ws) {
    ws.on('message', function(msg) {
      let message = JSON.parse(msg);
      let game = games[message.gameId];

      switch (message.action) {
        case 'JOIN':
          if (isNameAvailable(message.playerId, game.players)) {
            game.players.push({ name: message.playerId, isGuest: message.isGuest });
            ws.gameId = game.id; // asign the gameid to this connection for filtering during broadcast
          } else {
            // TODO would be "nice" to prevent the broadcast, but no real harm
            ws.send(
              JSON.stringify({
                error: 'Name already taken, try another'
              })
            );
          }
          break;
        case 'VOTE':
          // find the user and update their vote
          game.players.find(player => player.name === message.playerId).points = message.points;
          break;
        case 'RESET':
          console.log('reset called');
          game.showVotes = false;
          game.players.forEach(player => {
            delete player.points;
          });
          break;
        case 'CHANGE_TITLE':
          game.title = message.title;
          break;
        case 'SHOW_VOTES':
          game.showVotes = true;
          break;
        default:
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
