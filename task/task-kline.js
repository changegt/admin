const request = require('request');
const router = require('koa-router')();
const {sucObj} = require('../util/msg');

// var market = 'eos_usdt';
// var type = '1min';
// var size = 1;
// var url1 = 'http://api.zb.com/data/v1/kline?market='+market+'&type='+type+'&size='+size;
// var url2 = 'http://api.zb.com/data/v1/ticker?market='+market;

const getZBKline = async(url1, url2, market) => {
	var zbSucObj = sucObj();

	var ZBklineAjax = () => {
		return new Promise((resolve, reject) => {
			klineAjax(url1, (json) => {
				if(json.data.length){
					const start = json.data[0][1];
					zbSucObj.result.start = start;
				}
				resolve();
			});
		});
	};

	var ZBtickerAjax = () => {
		return new Promise((resolve, reject) => {
			tickerAjax(url2, resolve, reject, (json) => {
				if(json.ticker && json.ticker.last){
					const now = json.ticker.last;
					zbSucObj.result.now = now;
				}
				resolve();
			});
		});
	};

	var back = () => {
		console.log(zbSucObj);
		var returnStr = (zbSucObj.result.now - zbSucObj.result.start) / zbSucObj.result.start;
		// if(returnStr){
			// console.log(market+'----------'+zbSucObj.result.now+'--------'+returnStr);
		// }
	}

	return Promise.all([ZBklineAjax(), ZBtickerAjax(), back()]);
};

module.exports = {
	task: [getZBKline]
};


var klineAjax = (url, callback) => {
	request(url, (err, resp, body) => {
		if(!err && resp.statusCode == 200){
			const json = eval('('+body+')');
			callback(json);
		}
	});
};

var tickerAjax = (url, callback) => {
	request(url, (err, resp, body) => {
		if(!err && resp.statusCode == 200){
			const json = eval('('+body+')');
			callback(json);
		}
	});
};