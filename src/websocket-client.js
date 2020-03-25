var W3CWebSocket = require('websocket').w3cwebsocket;

export class WebSocketClient {
  register = (gameId, playerId, cb) => {
    this.client = new W3CWebSocket(`ws://${document.location.hostname}:4000/socket/poker`);
    this.gameId = gameId;
    this.playerId = playerId;
    this.cb = cb;

    this.connectSocket();

    this.client.onopen = () => {
      if (this.client.readyState === this.client.OPEN) {
        this.client.send(this.createMessage('JOIN'));
      } else {
        console.error('WebSocket not ready yet... we shouldnt be here, if we are, we might need a setTimeout');
      }
    };
  };

  vote = points => {
    this.client.send(this.createMessage('VOTE', { points }));
  };

  createMessage = (action, overrides) => {
    let message = {
      action,
      gameId: this.gameId,
      playerId: this.playerId,
      ...overrides
    };

    return JSON.stringify(message);
  };

  connectSocket = () => {
    this.client.onerror = e => {
      console.error('ERROR: WebSocket Client', e);
    };

    this.client.onmessage = message => {
      console.debug('WebSocket calling cb with ', JSON.parse(message.data));
      this.cb(JSON.parse(message.data));
    };

    this.client.onclose = function() {
      console.info('WebSocket Client Closed');
      this.client = undefined;
    };
  };
}