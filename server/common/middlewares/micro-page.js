'use strict';

var express = require('express');

/////////////////////////////////////////////

module.exports = micro_page_mw;

/////////////////////////////////////////////


function micro_page_mw(title, content) {
	return function(req, res) {
		res.send(`
<!DOCTYPE html>
<head>
	<title>${title}</title>
	<style type="text/css">
		body {
			margin: 33px;
			font-family: "Lucida Sans Typewriter", "Courier New", monospace;
			color: #333;
		}
	</style>
</head>

<h1>…</h1>
${content}

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = "${req.baseUrl}" + el.text);
	});
</script>
	`);
	};
}
