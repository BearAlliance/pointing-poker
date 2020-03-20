var W3CWebSocket = require('websocket').w3cwebsocket;

var client;

export function connectSocket(gameId, playerId, cb) {
  client = new W3CWebSocket(`ws://localhost:4000/?gid=${gameId}&pid=${playerId}`, 'da-game');

  client.onerror = e => {
    console.log('ERROR: WebSocket Client', e);
  };

  client.onmessage = message => {
    cb(message);
  };

  client.onopen = function() {
    console.log('WebSocket Client Connected', playerId);

    function sendNumber() {
      if (client.readyState === client.OPEN) {
        var number = Math.round(Math.random() * 0xffffff);
        client.send(number.toString());
        setTimeout(sendNumber, 5000);
      }
    }

    sendNumber();
  };

  client.onclose = function() {
    console.log('echo-protocol Client Closed');
  };
}
