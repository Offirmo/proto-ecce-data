#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var express = require('express');

var config = require('./config');

// http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// http://nodejs.org/api/os.html#os_os_networkinterfaces
var local_ips = _.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.map('address')
	.value();

/////////////////////////////////////////////

var app = express();

app.use('/', require('./routes'));

/////////////////////////////////////////////

app.listen(config.listening_port);

/////////////////////////////////////////////

_.forEach(local_ips, function(ip) {
	console.log('Listening on http://' + ip + ':' + config.listening_port);
});
console.log('(Ctrl+C to stop)');
