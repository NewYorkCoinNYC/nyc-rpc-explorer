#!/usr/bin/env node

var debug = require("debug");
var debugLog = debug("nycexp:config");

// to debug arg settings, enable the below line:
//debug.enable("nycexp:*");

const args = require('meow')(`
	Usage
	  $ nyc-rpc-explorer [options]

	Options
	  -p, --port <port>			  port to bind http server [default: 3002]
	  -i, --host <host>			  host to bind http server [default: 127.0.0.1]
	  -a, --basic-auth-password <..> protect web interface with a password [default: no password]
	  -C, --coin <coin>			  crypto-coin to enable [default: NYC]

	  -b, --newyorkcoind-uri <uri>	   connection URI for newyorkcoind rpc (overrides the options below)
	  -H, --newyorkcoind-host <host>	 hostname for newyorkcoind rpc [default: 127.0.0.1]
	  -P, --newyorkcoind-port <port>	 port for newyorkcoind rpc [default: 18823]
	  -c, --newyorkcoind-cookie <path>   path to newyorkcoind cookie file [default: ~/.newyorkc/.cookie]
	  -u, --newyorkcoind-user <user>	 username for newyorkcoind rpc [default: none]
	  -w, --newyorkcoind-pass <pass>	 password for newyorkcoind rpc [default: none]

	  --address-api <option>		 api to use for address queries (options: electrumx, blockchain.com, blockchair.com, blockcypher.com) [default: none]
	  -E, --electrumx-servers <..>   comma separated list of electrum servers to use for address queries; only used if --address-api=electrumx [default: none]

	  --rpc-allowall				 allow all rpc commands [default: false]
	  --rpc-blacklist <methods>	  comma separated list of rpc commands to block [default: see in config.js]
	  --cookie-secret <secret>	   secret key for signed cookie hmac generation [default: hmac derive from newyorkcoind pass]
	  --demo						 enable demoSite mode [default: disabled]
	  --no-rates					 disable fetching of currency exchange rates [default: enabled]
	  --slow-device-mode			 disable performance-intensive tasks (e.g. UTXO set fetching) [default: enabled]
	  --privacy-mode				 enable privacyMode to disable external data requests [default: disabled]
	  --max-mem <bytes>			  value for max_old_space_size [default: 1024 (1 GB)]

	  --ganalytics-tracking <tid>	tracking id for google analytics [default: disabled]
	  --sentry-url <sentry-url>	  sentry url [default: disabled]

	  -e, --node-env <env>		   nodejs environment mode [default: production]
	  -h, --help					 output usage information
	  -v, --version				  output version number

	Examples
	  $ nyc-rpc-explorer --port 8080 --newyorkcoind-port 18823 --newyorkcoind-cookie ~/.newyorkc/regtest/.cookie
	  $ nyc-rpc-explorer -p 8080 -P 18823 -c ~/.newyorkc/regtest.cookie

	Or using connection URIs
	  $ nyc-rpc-explorer -b newyorkcoin://bob:myPassword@127.0.0.1:18823/
	  $ nyc-rpc-explorer -b newyorkcoin://127.0.0.1:18823/?cookie=$HOME/.newyorkc/regtest/.cookie

	All options may also be specified as environment variables
	  $ NYCEXP_PORT=8080 NYCEXP_NEWYORKCOIND_PORT=18823 NYCEXP_NEWYORKCOIND_COOKIE=~/.newyorkc/regtest/.cookie nyc-rpc-explorer


`, {
		flags: {
			port: {alias:'p'},
			host: {alias:'i'},
			basicAuthPassword: {alias:'a'},
			coin: {alias:'C'},
			newyorkcoindUri: {alias:'b'},
			newyorkcoindHost: {alias:'H'},
			newyorkcoindPort: {alias:'P'},
			newyorkcoindCookie: {alias:'c'},
			newyorkcoindUser: {alias:'u'},
			newyorkcoindPass: {alias:'w'},
			demo: {},
			rpcAllowall: {},
			electrumxServers: {alias:'E'},
			nodeEnv: {alias:'e', default:'production'},
			privacyMode: {},
			slowDeviceMode: {}
		}
	}
).flags;

const envify = k => k.replace(/([A-Z])/g, '_$1').toUpperCase();

Object.keys(args).filter(k => k.length > 1).forEach(k => {
	if (args[k] === false) {
		debugLog(`Config(arg): NYCEXP_NO_${envify(k)}=true`);

		process.env[`NYCEXP_NO_${envify(k)}`] = true;

	} else {
		debugLog(`Config(arg): NYCEXP_${envify(k)}=${args[k]}`);

		process.env[`NYCEXP_${envify(k)}`] = args[k];
	}
});

require('./www');
