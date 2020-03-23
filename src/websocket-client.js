var W3CWebSocket = require('websocket').w3cwebsocket;

export class PokerSocket {
  register = (gameId, playerId, cb) => {
    this.client = new W3CWebSocket(`ws://localhost:4000/socket/echo`);
    this.gameId = gameId;
    this.playerId = playerId;
    this.cb = cb;

    this.connectSocket();

    this.client.onopen = () => {
      if (this.client.readyState === this.client.OPEN) {
        this.client.send(
          JSON.stringify({
            action: 'join',
            gameId,
            playerId
          })
        );
      } else {
        console.log('WebSocket not ready yet... we shouldnt be here, if we are, we need a setTimeout maybe');
      }
    };
  };

  vote = points => {
    this.client.send(
      JSON.stringify({
        action: 'vote',
        gameId: this.gameId,
        playerId: this.playerId,
        points
      })
    );
  };

  connectSocket = () => {
    this.client.onerror = e => {
      console.log('ERROR: WebSocket Client', e);
    };

    this.client.onmessage = message => {
      console.log('WebSocket calling cb with ', JSON.parse(message.data));
      this.cb(JSON.parse(message.data));
    };

    this.client.onclose = function() {
      console.log('WebSocket Client Closed');
      this.client = undefined;
    };
  };
}
