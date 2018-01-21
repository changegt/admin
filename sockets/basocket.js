const io = require('ws');
const send = require('./sms/alisms');

const ws = new io('wss://stream.binance.com:9443/ws/ethbtc@kline_1m');
let flag = true;
let lastprice = 0;

ws.onmessage = function (msg) {
    var str = eval('('+msg.data+')');
    const percent = parseFloat((str.k.c-str.k.o)/str.k.o*100).toFixed(2);

    //币安
    // console.log('【'+str.s+'】比例：'+percent+'%-----开始价格：'+str.k.o+'，当前价格:'+str.k.c);
    
    //发送消息
    if(percent > 10 && flag){
        console.log('【'+str.s+'】比例：'+percent+'%-----开始价格：'+str.k.o+'，当前价格:'+str.k.c);
        // send({
        //     name: str.s,
        //     percent: percent,
        //     startprice: str.k.o,
        //     nowprice: str.k.c
        // });
        flag = false;
    }
};
/* 关闭时 */
ws.onclose = function () {
    console.log("关闭连接");
};

let zbstr = 'bccbtc_ticker,ubtcbtc_ticker,ltcbtc_ticker,ethbtc_ticker,etcbtc_ticker,btsbtc_ticker,eosbtc_ticker,qtumbtc_ticker,hsrbtc_ticker,xrpbtc_ticker,bcdbtc_ticker,dashbtc_ticker,sbtcbtc_ticker,inkbtc_ticker,tvbtc_ticker,bcxbtc_ticker,bthbtc_ticker,lbtcbtc_ticker,chatbtc_ticker,hlcbtc_ticker,bcwbtc_ticker,btpbtc_ticker,topcbtc_ticker,entbtc_ticker,batbtc_ticker,1stbtc_ticker,safebtc_ticker,qunbtc_ticker,btnbtc_ticker,truebtc_ticker'.split(',');
