import { isDevelopment } from './env';
import { w3cwebsocket as W3cwebsocket, noop } from 'websocket';

export class WebSocketClient {
  constructor() {
    if (isDevelopment()) {
      this.client = new W3cwebsocket(`ws://${document.location.hostname}:4000/socket/poker`);
    } else {
      this.client = new W3cwebsocket(`wss://${document.location.hostname}/socket/poker`);
    }
  }
  register(gameId, isGuest, playerId, listeners) {
    this.gameId = gameId;
    this.playerId = playerId;
    this.onMessage = listeners.onMessage || noop;
    this.onError = listeners.onError || noop;
    this.onClose = listeners.onClose || noop;

    this.connectSocket();

    this.client.onopen = () => {
      if (this.client.readyState === this.client.OPEN) {
        this.keepAliveInterval = setInterval(() => this.keepAlive(), 25000);
        this.client.send(this.createMessage('JOIN', { isGuest }));
      } else {
        console.error('WebSocket not ready yet... we shouldnt be here, if we are, we might need a setTimeout');
      }
    };
  }

  keepAlive() {
    this.client.send(this.createMessage('KEEPALIVE'));
  }

  vote(points) {
    this.client.send(this.createMessage('VOTE', { points }));
  }

  updateTitle(title) {
    this.client.send(this.createMessage('CHANGE_TITLE', { title }));
  }

  showVotes() {
    this.client.send(this.createMessage('SHOW_VOTES'));
  }

  resetVotes() {
    this.client.send(this.createMessage('RESET'));
  }

  createMessage(action, overrides) {
    let message = {
      action,
      gameId: this.gameId,
      playerId: this.playerId,
      ...overrides
    };

    return JSON.stringify(message);
  }

  connectSocket() {
    this.client.onerror = e => {
      console.error('ERROR: WebSocket Client', e);
      this.onError(e);
    };

    this.client.onmessage = message => {
      const data = JSON.parse(message.data);
      console.log('Got a message from the server', data);
      this.onMessage(data);
    };

    this.client.onclose = () => {
      console.info('WebSocket Client Closed');
      clearInterval(this.keepAliveInterval);
      this.onClose();
      this.client = undefined;
    };
  }

  disconnect() {
    this.client.close();
  }
}
