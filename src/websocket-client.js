import { isDevelopment } from './env';
import { w3cwebsocket as W3cwebsocket, noop } from 'websocket';

export class WebSocketClient {
  constructor(sessionId, playerId, type, listeners) {
    if (isDevelopment()) {
      this.client = new W3cwebsocket(`ws://${document.location.hostname}:4000/socket/${type}`);
    } else {
      this.client = new W3cwebsocket(`wss://${document.location.hostname}/socket/${type}`);
    }
    this.keepAliveInterval = setInterval(() => this.keepAlive(), 25000);

    this.id = sessionId;
    this.playerId = playerId;
    this.onMessage = listeners.onMessage || noop;
    this.onError = listeners.onError || noop;
    this.onClose = listeners.onClose || noop;

    this.registerListeners();
  }

  connect() {
    this.client.onopen = () => {
      if (this.client.readyState === this.client.OPEN) {
        this.client.send(this.createMessage('JOIN'));
      } else {
        console.error('WebSocket not ready yet... we shouldnt be here, if we are, we might need a setTimeout');
      }
    };
  }

  keepAlive() {
    this.client.send(this.createMessage('KEEPALIVE'));
  }

  createMessage(action, overrides) {
    let message = {
      action,
      sessionId: this.id,
      playerId: this.playerId,
      ...overrides
    };

    return JSON.stringify(message);
  }

  registerListeners() {
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

export class RetroSocket extends WebSocketClient {
  addItem(text, column) {
    this.client.send(this.createMessage('ADD_ITEM', { column, text }));
  }

  removeItem(itemId) {
    this.client.send(this.createMessage('REMOVE_ITEM', { itemId }));
  }

  likeItem(itemId) {
    this.client.send(this.createMessage('LIKE_ITEM', { itemId }));
  }

  unlikeItem(itemId) {
    this.client.send(this.createMessage('UNLIKE_ITEM', { itemId }));
  }
}

export class PokerSocket extends WebSocketClient {
  vote(points) {
    this.client.send(this.createMessage('VOTE', { points }));
  }

  updateTitle(title) {
    this.client.send(this.createMessage('CHANGE_TITLE', { title }));
  }

  showVotes() {
    this.client.send(this.createMessage('SHOW_VOTES'));
  }

  hideVotes() {
    this.client.send(this.createMessage('HIDE_VOTES'));
  }

  resetVotes() {
    this.client.send(this.createMessage('RESET'));
  }

  becomeObserver() {
    this.client.send(this.createMessage('BECOME_OBSERVER'));
  }

  becomePlayer() {
    this.client.send(this.createMessage('BECOME_PLAYER'));
  }
}
