const express = require('express');
var WebSocketConnection = require('websocket').connection;
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
      let shouldBroadcast = true;

      switch (message.action) {
        case 'JOIN':
          if (isNameAvailable(message.playerId, game.players)) {
            console.log(`Game ${game.id}: adding player ${message.playerId}`);
            game.players.push({ name: message.playerId, isGuest: message.isGuest });
            ws.gameId = game.id; // assign the gameId to this connection for filtering during broadcast
            ws.player = message.playerId;
          } else {
            shouldBroadcast = false;
            ws.send(
              JSON.stringify({
                error: 'Name already taken, try another'
              })
            );
          }
          break;
        case 'VOTE':
          console.log(`Game ${game.id}: player ${message.playerId} voting ${message.points}`);
          game.players.find(player => player.name === message.playerId).points = message.points;
          break;
        case 'RESET':
          console.log(`Game ${game.id}: resetting`);
          game.showVotes = false;
          game.players.forEach(player => {
            delete player.points;
          });
          break;
        case 'CHANGE_TITLE':
          console.log(`Game ${game.id}: title becomes ${message.title}`);
          game.title = message.title;
          break;
        case 'SHOW_VOTES':
          console.log(`Game ${game.id}: showing votes`);
          game.showVotes = true;
          break;
        case 'KEEPALIVE':
          shouldBroadcast = false;
          console.log(`Game ${game.id}: keeping alive ${message.playerId}`);
          break;
        default:
          console.log('got message', message);
          shouldBroadcast = false;
          ws.send(JSON.stringify(message));
      }

      if (shouldBroadcast) {
        broadcastGameUpdate(game);
      }
    });

    ws.on('close', reasonCode => {
      console.log(`Game ${ws.gameId}: Player ${ws.player} disconnecting: ${reasonCode}:${getDescription(reasonCode)}`);
      const game = games[ws.gameId];
      games[ws.gameId].players = game.players.filter(player => player.name !== ws.player);
      console.log('Players remaining', game.players);
      broadcastGameUpdate(game);
    });
  });

  function getDescription(code) {
    return WebSocketConnection.CLOSE_DESCRIPTIONS[code];
  }

  function broadcastGameUpdate(game) {
    expressWs.getWss('/socket/poker').clients.forEach(client => {
      if (client.gameId === game.id) {
        client.send(JSON.stringify({ game }));
      }
    });
  }

  return router;
}
