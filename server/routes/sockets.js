const express = require('express');
const router = express.Router();

export function getSocketRouter() {
  console.log('registered');
  router.ws('/echo', function(ws, req) {
    console.log('called');
    ws.on('message', function(msg) {
      console.log('got echo', msg);
      ws.send(msg);
    });
  });
  return router;
}
