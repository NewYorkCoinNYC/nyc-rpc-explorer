"use strict";

const debug = require("debug");
const debugLog = debug("nycexp:router");

const express = require('express');
const csurf = require('csurf');
const router = express.Router();
const util = require('util');
const moment = require('moment');
const newyorkcoinCore = require("newyorkcoin-core");
const qrcode = require('qrcode');
const newyorkcoinjs = require('newyorkcoinjs-lib');
const sha256 = require("crypto-js/sha256");
const hexEnc = require("crypto-js/enc-hex");
const Decimal = require("decimal.js");

const utils = require('./../app/utils.js');
const coins = require("./../app/coins.js");
const config = require("./../app/config.js");
const coreApi = require("./../app/api/coreApi.js");
const addressApi = require("./../app/api/addressApi.js");

const forceCsrf = csurf({ ignoreMethods: [] });





router.get("/formatCurrencyAmount/:amt", function(req, res, next) {
	res.locals.currencyValue = req.params.amt;

	res.render("includes/value-display");

	next();
});


module.exports = router;
