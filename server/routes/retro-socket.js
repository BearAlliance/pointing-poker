import express from 'express';
import websocket from 'websocket';
import { v4 as uuidv4 } from 'uuid';
import { retros } from '../state';

const WebSocketConnection = websocket.connection;
const router = express.Router();

function isNameAvailable(name, players = []) {
  return (
    players.find(p => {
      return p.name === name;
    }) === undefined
  );
}

export function getRetroSocketRouter(expressWs) {
  router.ws('/', function(ws) {
    ws.on('message', function(msg) {
      let message = JSON.parse(msg);
      const retro = retros[message.sessionId];
      const playerId = message.playerId;
      let shouldBroadcast = true;

      switch (message.action) {
        case 'JOIN':
          if (isNameAvailable(playerId, retro.players)) {
            console.log(`Retro ${retro.id}: adding player ${playerId}`);
            retro.players.push({ name: playerId });
            ws.retroId = retro.id; // assign the retroId to this connection for filtering during broadcast
            ws.player = playerId;
          } else {
            shouldBroadcast = false;
            ws.send(
              JSON.stringify({
                error: 'Name already taken, try another'
              })
            );
          }
          break;
        case 'KEEPALIVE':
          shouldBroadcast = false;
          console.log(`retro ${retro.id}: keeping alive ${playerId}`);
          break;
        case 'ADD_ITEM':
          console.log(`Retro ${retro.id}: ${playerId} adding item to ${message.column}`);
          retro.columns[message.column] = [
            ...(retro.columns[message.column] || []),
            { text: message.text, playerId, id: uuidv4(), votes: [] }
          ];
          break;
        case 'REMOVE_ITEM':
          console.log(`Retro ${retro.id}: ${playerId} removing item ${message.itemId}`);
          Object.keys(retro.columns).forEach(columnName => {
            retro.columns[columnName] = retro.columns[columnName].filter(item => item.id !== message.itemId);
          });
          break;
        case 'LIKE_ITEM':
          console.log(`Retro ${retro.id}: ${playerId} liking item ${message.itemId}`);
          Object.keys(retro.columns).forEach(columnName => {
            retro.columns[columnName] = retro.columns[columnName].map(item => {
              if (item.id === message.itemId) {
                item.votes.push({ playerId });
              }
              return item;
            });
          });
          break;
        case 'UNLIKE_ITEM':
          console.log(`Retro ${retro.id}: ${playerId} unliking item ${message.itemId}`);
          Object.keys(retro.columns).forEach(columnName => {
            retro.columns[columnName].forEach(item => {
              if (item.id === message.itemId) {
                console.log(item);
                console.log(playerId);
                item.votes = item.votes.filter(vote => vote.playerId !== playerId);
                console.log(item);
              }
              return item;
            });
          });
          break;

        default:
          console.log('got message', message);
          shouldBroadcast = false;
          ws.send(JSON.stringify(message));
      }

      if (shouldBroadcast) {
        broadcastUpdate(retro);
      }
    });

    ws.on('close', reasonCode => {
      console.log(
        `Retro ${ws.retroId}: Player ${ws.player} disconnecting: ${reasonCode}:${getDescription(reasonCode)}`
      );
      const retro = retros[ws.retroId];
      retros[ws.retroId].players = retro.players.filter(player => player.name !== ws.player) || [];
      console.log('Players remaining', retro.players);
      broadcastUpdate(retro);
    });
  });

  function getDescription(code) {
    return WebSocketConnection.CLOSE_DESCRIPTIONS[code];
  }

  function broadcastUpdate(retro) {
    expressWs.getWss('/socket/retro').clients.forEach(client => {
      if (client.retroId === retro.id) {
        client.send(JSON.stringify({ retro }));
      }
    });
  }

  return router;
}
