const WebSocket = require('ws');
const pako = require('pako');
const send = require('../sms/alisms');
const fs = require('fs');
const logger = require('./log');
const chalk = require('chalk');
const WS_URL = 'wss://api.huobi.pro/ws';

function subscribe(ws, market) {
    // 订阅K线
    ws.send(JSON.stringify({
        "req": "market."+market+".kline.1min",
        "id": market
    }));
}

// var smsFlag = true;

var init = (marketArr) => {
    var ws = new WebSocket(WS_URL);
    var name,open,close,percent;

    let i = 0;
    let maxLength = marketArr.length;
    var run = {
        init (arr) {
            if(i > maxLength - 1){
                i = 0;
                setTimeout(() => {
                    subscribe(ws, arr[i]);
                    i++;               
                }, 50000);
            }else{
                subscribe(ws, arr[i]);
                i++;
            }
        },
        next (arr) {
            run.init(arr);
        }
    };

    ws.on('open', () => {
        console.log('open');
        run.init(marketArr);  
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
        } else if (msg.data) {
            name = 'hb---'+msg.id;
            open = msg.data[msg.data.length-1].open;
            close = msg.data[msg.data.length-1].close;
            percent = parseFloat((close - open) / open * 100).toFixed(2);
            //发送消息, 测试只允许发送一次
            if(Math.abs(percent) >= 6.5){
                var txt = '【'+name+'】比例：'+percent+'%-----开始价格：'+open+'，当前价格:'+close;
                console.log(txt);
                // if(smsFlag){ 
                    // send({
                    //     name: name,
                    //     percent: percent,
                    //     startprice: open,
                    //     nowprice: close
                    // });
                    // smsFlag = false;
                // }
            }
            run.next(marketArr);
        }
    });
    ws.on('close', (data) => {
        console.log('hbclose='+data);
        logger.error('hbclose='+data);
        init(marketArr);
    });
    ws.on('error', err => {
        console.log('hberror='+err);
        logger.error('hberror='+err);
        init(marketArr);
    });
};

module.exports = init;
