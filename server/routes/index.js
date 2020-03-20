var express = require('express');
var router = express.Router();

router.get('/game/:gameId', function(req, res) {
  res.json({ id: req.params.gameId });
});

module.exports = router;
