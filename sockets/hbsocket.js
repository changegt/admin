const WebSocket = require('ws');
const pako = require('pako');
const send = require('../sms/alisms');

const WS_URL = 'wss://api.huobi.pro/ws';

function subscribe(ws, market) {
    // 订阅K线
    ws.send(JSON.stringify({
        "sub": "market."+market+".kline.1min",
        "id": market
    }));
}

var init = (market) => {
    var ws = new WebSocket(WS_URL);
    ws.on('open', () => {
        console.log('open');
        subscribe(ws, market);
    });
    ws.on('message', (data) => {
        let text = pako.inflate(data, {
            to: 'string'
        });
        let msg = JSON.parse(text);
        if (msg.ping) {
            ws.send(JSON.stringify({
                pong: msg.ping
            }));
        } else if (msg.tick) {

            var percent = parseFloat((msg.tick.close - msg.tick.open) / msg.tick.open * 100).toFixed(2);
            if(Math.abs(percent)){

                console.log('【'+msg.ch.split('.')[1]+'】比例：'+percent+'%-----开始价格：'+msg.tick.open+'，当前价格:'+msg.tick.close);

                //发送消息
                // send({
                //     name: msg.ch.split('.')[1],
                //     percent: percent,
                //     startprice: msg.tick.open,
                //     nowprice: msg.tick.close
                // });
            
            }
        } else {
            
        }
    });
    ws.on('close', () => {
        console.log('close');
        init();
    });
    ws.on('error', err => {
        console.log('error', err);
        init();
    });
};

module.exports = init;
