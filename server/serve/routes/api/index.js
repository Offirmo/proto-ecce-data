'use strict';

var express = require('express');
var micro_page_mw = require('../../../common/middlewares/micro-page');

/////////////////////////////////////////////

var router = module.exports = new express.Router({mergeParams: true});

/////////////////////////////////////////////

router.get('/', micro_page_mw('Ecclesia data - API', `
	<p>Available APIs, by version :</p>
	<a>/v0</a>
`));

router.use('/v0', require('./v0'));
