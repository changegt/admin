const io = require('ws');
// const ws = new io('wss://api.zb.com:9999/websocket');
const ws = new io('wss://stream.binance.com:9443/ws/ethbtc@kline_1m');
let num = 0;
let lastprice = 0;

ws.onmessage = function (msg) {
    var str = eval('('+msg.data+')');

    //币安 ok
    console.log(num+'【'+str.s+'】开始价格：'+str.k.o+'---------------结束价格:'+str.k.c);

    //中币 ，开始价格智能通过http获取
    // if(lastprice != str.ticker.last){
    //     console.log(num+'【'+str.channel+'】最新成交价格：'+str.ticker.last+'---------------last成交价:'+lastprice);
    //     num++;
    //     lastprice = str.ticker.last;
    // }
};
/* 关闭时 */
ws.onclose = function () {
    console.log("关闭连接");
};

let zbstr = 'bccbtc_ticker,ubtcbtc_ticker,ltcbtc_ticker,ethbtc_ticker,etcbtc_ticker,btsbtc_ticker,eosbtc_ticker,qtumbtc_ticker,hsrbtc_ticker,xrpbtc_ticker,bcdbtc_ticker,dashbtc_ticker,sbtcbtc_ticker,inkbtc_ticker,tvbtc_ticker,bcxbtc_ticker,bthbtc_ticker,lbtcbtc_ticker,chatbtc_ticker,hlcbtc_ticker,bcwbtc_ticker,btpbtc_ticker,topcbtc_ticker,entbtc_ticker,batbtc_ticker,1stbtc_ticker,safebtc_ticker,qunbtc_ticker,btnbtc_ticker,truebtc_ticker'.split(',');

var str1 = 'etcusdt_ticker'.split(',');

// setInterval(() => {
//     str1.forEach((item) => {
//         var obj = {
//             'event':'addChannel',
//             'channel':item
//         };
//         ws.send(JSON.stringify(obj));
//     })
// }, 2000);
