'use strict';

var express = require('express');
var micro_page_mw = require('../../../../common/middlewares/micro-page');

/////////////////////////////////////////////

var router = module.exports = new express.Router({mergeParams: true});

/////////////////////////////////////////////

router.get('/', micro_page_mw('Ecclesia data - v0 API', `
	<p>Available data :</p>
	<a>/parishes</a>
`));

router.use('/parishes', require('./parishes'));
