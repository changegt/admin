module.exports = function(){
	const fs = require('fs');
	var oData = [], minwrite = {};

	var data , arr = [];

	if(!fs.existsSync('./task/oData.json')){
		data = fs.readFileSync('./task/okdata.json', 'utf-8');
		arr = eval('('+data+')').data;
		arr.forEach((item) => {
			oData.push({'event':'addChannel','channel':'ok_sub_spot_'+item.symbol+'_kline_1min'});
		});
		fs.writeFileSync('./task/oData.json', JSON.stringify(oData));
	}else{
		oData = eval('('+fs.readFileSync('./task/oData.json', 'utf-8')+')');
	}


	if(!fs.existsSync('./task/minwrite.json')){
		//不存在minwrite文件
		if(typeof data == 'undefined'){
			data = fs.readFileSync('./task/okdata.json', 'utf-8');
			arr = eval('('+data+')').data;
		}
		arr.forEach((item) => {
			minwrite[item.symbol] = 0;
		});
		fs.writeFileSync('./task/minwrite.json', JSON.stringify(minwrite));
	}else{
		minwrite = eval('('+fs.readFileSync('./task/minwrite.json', 'utf-8')+')');
	}

	const oksocket = require('../sockets/oksocket.js')(oData, minwrite);
};