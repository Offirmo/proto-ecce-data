'use strict';

var express = require('express');
var micro_page_mw = require('../../common/middlewares/micro-page');

/////////////////////////////////////////////

var router = module.exports = new express.Router({mergeParams: true});

/////////////////////////////////////////////

router.get('/', micro_page_mw('Ecclesia Data', `
	<p>Welcome to Ecclesia Data ! This website is meant to be read by computers.</p>
	<a>/api</a>
`));

router.use('/api', require('./api'));
