"use strict";
var OpenJTalk = require('node-openjtalk').OpenJTalk;

var fn_voice = OpenJTalk.voices.mei_normal;

var open_jtalk = new OpenJTalk({voice: fn_voice});

module.exports = open_jtalk;
