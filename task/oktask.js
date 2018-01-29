module.exports = function(){
	const fs = require('fs');

	const data = fs.readFileSync('./sockets/okdata.json', 'utf-8');
	const arr = eval('('+data+')').data;
	var oData = [
	    // {'event':'addChannel','channel':'ok_sub_spot_xrp_btc_kline_1min'}
	];
	
	arr.forEach((item) => {
		oData.push({'event':'addChannel','channel':'ok_sub_spot_'+item.symbol+'_kline_1min'});
	});

	const oksocket = require('../sockets/oksocket.js')(oData);
};