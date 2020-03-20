// See https://github.com/theturtle32/WebSocket-Node
const WebSocketServer = require('websocket').server;

module.exports = {
  createWebSocket: function(server) {
    let wsServer = new WebSocketServer({
      httpServer: server,
      // You should not use autoAcceptConnections for production
      // put logic here to detect whether the specified origin is allowed.
      // applications, as it defeats all standard cross-origin protection
      // facilities built into the protocol and the browser.  You should
      // *always* verify the connection's origin and decide whether or not
      // to accept it.
      autoAcceptConnections: false
    });

    console.log('created WS server');
    function originIsAllowed(origin) {
      // put logic here to detect whether the specified origin is allowed.
      if (origin === 'some-nefarious-host') {
        return false;
      }
      return true;
    }

    wsServer.on('request', function(request) {
      console.log('incoming request!');
      if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log(new Date() + ' Connection from origin ' + request.origin + ' rejected.');
        return;
      }

      var connection = request.accept('da-game', request.origin);
      console.log(new Date() + ' Connection accepted.');
      connection.on('message', function(message) {
        if (message.type === 'utf8') {
          console.log('Received Message: ' + message.utf8Data);
          connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {
          console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
          connection.sendBytes(message.binaryData);
        }
      });
    });
  }
};
