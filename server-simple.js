const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

//keygrip  cookies密匙
const Keygrip = require('keygrip');
app.keys = new Keygrip(['im a newer secret', 'i like turtle'], 'sha256');

//配置jsonp
const jsonp = require('koa-safe-jsonp');
jsonp(app, {
	callback: 'callback', //设置默认callback参数
});

//common errorObj
const {errorObj} = require('./util/msg');

//遍历controller里面的所有路由
const router = require('koa-router')();
const controllerList = fs.readdirSync('./controller');

for (var i = 0; i < controllerList.length; i++) {
	const thisControllerName = controllerList[i].split('.js')[0];
	const thispath = './controller/'+thisControllerName;
	const mapping = require(thispath);
	for (var j in mapping) {
		const url = '/'+thisControllerName+j; //将当前的controller的name设置为url前一级
		const func = mapping[j];
		router.get(url, func);
	}
}

app
	.use(router.routes())
	.use(router.allowedMethods())
	.use(async (ctx, next) => {
		ctx.jsonp = errorObj;
	});

app.listen(3000);

// const taskObj = require('./task/task-kline');

// const ZBArr = 'bcc_btc,ubtc_btc,ltc_btc,eth_btc,etc_btc,bts_btc,eos_btc,qtum_btc,hsr_btc,xrp_btc,bcd_btc,dash_btc,sbtc_btc,ink_btc,tv_btc,bcx_btc,bth_btc,lbtc_btc,chat_btc,hlc_btc,bcw_btc,btp_btc,topc_btc,ent_btc,bat_btc,1st_btc,safe_btc,qun_btc,btn_btc,true_btc'.split(',');

// //for task
// const schedule = require("node-schedule"); 
// const rule1 = new schedule.RecurrenceRule();  
// const times1 = [1,6,11,16,21,26,31,36,41,46,51,56];
// rule1.second = times1; 
// schedule.scheduleJob(rule1, function(){
// 	for (var i = ZBArr.length - 1; i >= 0; i--) {
// 		const market = ZBArr[i];
// 		const url1 = 'http://api.zb.com/data/v1/kline?market='+market+'&type=1min&size=1';
// 		const url2 = 'http://api.zb.com/data/v1/ticker?market='+market;
// 		taskObj.task[0](url1, url2, market);
// 	}
// });

//socket id

var WebSocket = require('ws');
var ws = new WebSocket('wss://api.zb.com:9999/websocket');
ws.onopen = function(){
	console.log(3);
};

ws.onmessage = function(evt){
	console.log(0);
};

ws.onclose = function(evt){console.log('1');};

ws.onerror = function(evt){console.log('2');};

 


