var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"NYC",
		multiplier:1,
		default:true,
		values:["", "nyc", "NYC"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mNYC",
		multiplier:1000,
		values:["mnyc"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:8,
		symbol:"$"
	},
];

module.exports = {
	name:"Newyorkcoin",
	ticker:"NYC",
	logoUrl:"/img/logo/nyc.svg",
	siteTitle:"NewYorkCoin Explorer",
	nodeTitle:"NewYorkCoin Full Node",
	nodeUrl:"https://nycapiserver.newyorkcoin.xyz/",
	demoSiteUrl: "https://nyc.explorer.xyz",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 30,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"NYC":currencyUnits[0], "mNYC":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "5597f25c062a3038c7fd815fe46c67dedfcb3c839fbc8e01ed4044540d08fe48",
	genesisCoinbaseTransactionId: "df34593a55b7ed0ff076766805023c8262fe26c84ba8624b77abae446c402dea",
	genesisCoinbaseTransaction: {
		"txid":"2c220b8515e805ce9ded37719065f95a2df566a110b4a6b4361197bfbbfcd504",
		"hash":"df34593a55b7ed0ff076766805023c8262fe26c84ba8624b77abae446c402dea",
		"blockhash":"df34593a55b7ed0ff076766805023c8262fe26c84ba8624b77abae446c402dea",
		"version":1,
		"locktime":0,
		"size":190,
		"vsize":190,
		"time":1394124864,
		"blocktime":1394124864,
		"vin":[
			{
				"prev_out":{
					"hash":"5597f25c062a3038c7fd815fe46c67dedfcb3c839fbc8e01ed4044540d08fe48",
					"n":4294967295
				},
				"coinbase":"04ffff001d0104404e592054696d65732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997320566973696f6e6172792c2044696573206174203536"
			}
		],
		"vout":[
			{
				"value":"907,477.0",
				"n":0,
				"scriptPubKey":{
					"hex":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":0,
					"addresses":[
						"RGzWMk8VCpZKjQiMLoPRHTunc627ECrKi7"
					]
				}
			}
		]
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2014-03-06",
			blockHeight: 0,
			blockHash: "5597f25c062a3038c7fd815fe46c67dedfcb3c839fbc8e01ed4044540d08fe48",
			summary: "The NewYorkCoin genesis block.",
			alertBodyHtml: "This is the first block in the NewYorkCoin blockchain.",
			referenceUrl: "https://chainz.cryptoid.info/nyc/block.dws?df34593a55b7ed0ff076766805023c8262fe26c84ba8624b77abae446c402dea.htm"
		}
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/newyorkcoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};