"use strict";

var express = require('express');
var open_jtalk = require('../open-jtalk');
var router = express.Router();

router.post('/', function(req, res, next) {
  open_jtalk.synthesize(req.body.text.slice(0, 200), function(error, buffer) {
    if (!error) {
      res.send(buffer);
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;
