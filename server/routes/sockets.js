const express = require('express');
const router = express.Router();

export function getSocketRouter() {
  console.log('registered websocket serverside route');

  router.ws('/echo', function(ws /*, req */) {
    ws.on('message', function(msg) {
      console.log('got echo', msg);
      ws.send(msg);
    });
  });

  return router;
}
