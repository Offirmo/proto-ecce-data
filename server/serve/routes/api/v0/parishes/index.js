'use strict';

var _ = require('lodash');
var express = require('express');

var parish_data = require('../../../../../../common/static_data/parish').data;

/////////////////////////////////////////////

var router = module.exports = new express.Router({mergeParams: true});

/////////////////////////////////////////////

router.get('/', function(req, res) {
	res.type('json').send(parish_data);
});
