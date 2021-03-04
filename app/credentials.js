"use strict";

const os = require('os');
const path = require('path');
const url = require('url');

const nycUri = process.env.NYCEXP_NEWYORKCOIND_URI ? url.parse(process.env.NYCEXP_NEWYORKCOIND_URI, true) : { query: { } };
const nycAuth = nycUri.auth ? nycUri.auth.split(':') : [];

module.exports = {
	rpc: {
		host: nycUri.hostname || process.env.NYCEXP_NEWYORKCOIND_HOST || "127.0.0.1",
		port: nycUri.port || process.env.NYCEXP_NEWYORKCOIND_PORT || 8332,
		username: nycAuth[0] || process.env.NYCEXP_NEWYORKCOIND_USER,
		password: nycAuth[1] || process.env.NYCEXP_NEWYORKCOIND_PASS,
		cookie: nycUri.query.cookie || process.env.NYCEXP_NEWYORKCOIND_COOKIE || path.join(os.homedir(), '.newyorkcoin', '.cookie'),
		timeout: parseInt(nycUri.query.timeout || process.env.NYCEXP_NEWYORKCOIND_RPC_TIMEOUT || 5000),
	},

	// optional: enter your api access key from ipstack.com below
	// to include a map of the estimated locations of your node's
	// peers
	// format: "ID_FROM_IPSTACK"
	ipStackComApiAccessKey: process.env.NYCEXP_IPSTACK_APIKEY,

	// optional: GA tracking code
	// format: "UA-..."
	googleAnalyticsTrackingId: process.env.NYCEXP_GANALYTICS_TRACKING,

	// optional: sentry.io error-tracking url
	// format: "SENTRY_IO_URL"
	sentryUrl: process.env.NYCEXP_SENTRY_URL,
};
