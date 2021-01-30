# NYC RPC Explorer

![homepage](https://github.com/NewYorkCoinNYC/nyc-rpc-explorer/blob/master/public/img/screenshots/homepage.png?raw=true)

[![npm version][npm-ver-img]][npm-ver-url] [![NPM downloads][npm-dl-img]][npm-dl-url]


Simple, database-free Newyorkcoin blockchain explorer, via RPC to [Newyorkcoin Core](https://github.com/NewYorkCoinNYC/newyorkcoin).

This is a simple, self-hosted explorer for the Newyorkcoin blockchain, driven by RPC calls to your own [Newyorkcoin](https://github.com/newyorNewYorkCoinNYCkcoin/newyorkcoin) node. It is easy to run and can be connected to other tools (like [ElectrumX](https://github.com/NewYorkCoinNYC/electrumx)) to achieve a full-featured explorer.

Whatever reasons one may have for running a full node (trustlessness, technical curiosity, supporting the network, etc) it's helpful to appreciate the "fullness" of your node. With this explorer, you can explore not just the blockchain database, but also explore the functional capabilities of your own node.

Live demo available at: [https://explorer.nyc21.org](https://explorer.nyc21.org)

# Features

* Network Summary dashboard
* View details of blocks, transactions, and addresses
* Analysis tools for viewing stats on blocks, transactions, and miner activity
* See raw JSON content from newyorkcoind used to generate most pages
* Search by transaction ID, block hash/height, and address
* Optional transaction history for addresses by querying from ElectrumX, blockchain.com, blockchair.com, or blockcypher.com
* Mempool summary, with fee, size, and age breakdowns
* RPC command browser and terminal

# Changelog / Release notes

See [CHANGELOG.md](/CHANGELOG.md).

# Getting started

## Prerequisites

1. Install and run a full, archiving node - [instructions](https://newyorkcoin.net/full-node). Ensure that your newyorkcoin node has full transaction indexing enabled (`txindex=1`) and the RPC server enabled (`server=1`).
2. Synchronize your node with the Newyorkcoin network (you *can* use this tool while your node is still sychronizing, but some pages may fail).
3. Install a "recent" version of Node.js (8+ recommended).

## Install / Run

If you're running on mainnet with the default datadir and port, the default configuration should *Just Work*. Otherwise, see the **Configuration** section below.

#### Install via `npm`:

```bash
npm install -g nyc-rpc-explorer
nyc-rpc-explorer
```

#### Run from source:

1. `git clone https://github.com/NewYorkCoinNYC/nyc-rpc-explorer`
2. `cd nyc-rpc-explorer`
3. `npm install`
4. `npm start`


Using either method (`npm install` or run from source), after startup open [http://127.0.0.1:3002/](http://127.0.0.1:3002/)


## Configuration

Configuration options may be set via environment variables or CLI arguments.

#### Configuration with environment variables

To configure with environment variables, you need to create one of the 2 following files and enter values in it:

1. `~/.config/nyc-rpc-explorer.env`
2. `.env` in the working directory for nyc-rpc-explorer

In either case, refer to [.env-sample](.env-sample) for a list of the options and formatting details.

#### Configuration with CLI args

For configuring with CLI arguments, run `nyc-rpc-explorer --help` for the full list of options. An example execution is:

```bash
nyc-rpc-explorer --port 8080 --newyorkcoind-port 18823 --newyorkcoind-cookie ~/.newyorkc/regtest/.cookie
```

#### Demo site settings

To match the features visible on the demo site at [https://explorer.nyc21.org](https://explorer.nyc21.org) you'll need to set the following non-default configuration values:

    NYCEXP_DEMO=true 		# enables some demo/informational aspects of the site
    NYCEXP_NO_RATES=false		# enables querying of exchange rate data
    NYCEXP_SLOW_DEVICE_MODE=false	# enables resource-intensive tasks (UTXO set query, 24hr volume querying) that are inappropriate for "slow" devices

#### SSO authentication

You can configure SSO authentication similar to what ThunderHub and RTL provide.
To enable it, make sure `NYCEXP_BASIC_AUTH_PASSWORD` is **not** set and set `NYCEXP_SSO_TOKEN_FILE` to point to a file write-accessible by nyc-rpc-explorer.
Then to access nyc-rpc-explorer, your SSO provider needs to read the token from this file and set it in URL parameter `token`.
For security reasons the token changes with each login, so the SSO provider needs to read it each time!

After successfull access with the token a cookie is used for authentication, so you don't have to worry about it anymore.
To improve user experience you can set `NYCEXP_SSO_LOGIN_REDIRECT_URL` to the URL of your SSO provider.
This causes the users to be redirected to login page if not logged in.

## Run via Docker

1. `docker build -t nyc-rpc-explorer .`
2. `docker run -it -p 3002:3002 -e NYCEXP_HOST=0.0.0.0 nyc-rpc-explorer`


## Reverse proxy with HTTPS

See [instructions here](docs/nginx-reverse-proxy.md) for using nginx+certbot (letsencrypt) for an HTTPS-accessible, reverse-proxied site.

# Support

If you get value from this project, please consider supporting my continued work with a donation. Any and all donations are truly appreciated.

* [https://donate.nyc21.org](https://donate.nyc21.org)


[npm-ver-img]: https://img.shields.io/npm/v/nyc-rpc-explorer.svg?style=flat
[npm-ver-url]: https://www.npmjs.com/package/nyc-rpc-explorer
[npm-dl-img]: http://img.shields.io/npm/dm/nyc-rpc-explorer.svg?style=flat
[npm-dl-url]: https://npmcharts.com/compare/nyc-rpc-explorer?minimal=true

