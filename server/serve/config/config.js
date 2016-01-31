'use strict';

// since it's safer to access dev from prod than prod from dev,
// defaults config targets dev and config.production.js specializes it to prod

module.exports = {
	listening_port: 7000,
};
