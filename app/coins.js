"use strict";

const nyc = require("./coins/nyc.js");
const ltc = require("./coins/ltc.js");

module.exports = {
	"NYC": nyc,
	"LTC": ltc,

	"coins":["NYC", "LTC"]
};