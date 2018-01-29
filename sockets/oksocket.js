const WebSocket = require('ws');
const send = require('../sms/alisms');
const fs = require('fs');
const logger = require('./log');
const chalk = require('chalk');

const WS_URL = 'wss://real.okex.com:10441/websocket';

let name, start, now, percent;
let sendFlag = true;

function subscribe(ws, oData) {
    // 订阅K线
    ws.send(JSON.stringify(oData));
}

var init = (oData) => {
    var ws = new WebSocket(WS_URL);
    ws.on('open', () => {
        console.log('open');
        subscribe(ws, oData);
    });
    ws.on('message', (data) => {
        let arr = eval('('+data+')');
        if(arr[0].channel == 'addChannel' && arr[0].data.result == true){
            //第一次获取
        }else{
            //获取数据
            if(arr[0].data && arr[0].data.length > 0){
                name = 'okex____'+arr[0].channel.split('spot_')[1].split('_kline')[0];
                start = arr[0].data[arr[0].data.length-1][1];
                now = arr[0].data[arr[0].data.length-1][4];
                percent = parseFloat((now - start) / start * 100).toFixed(2);
                if(percent){
                    console.log('【'+name+'】比例：'+percent+'%-----开始价格：'+start+'，当前价格:'+now);

                    // if(sendFlag){
                        // send({
                        //     name: name,
                        //     percent: percent,
                        //     startprice: start,
                        //     nowprice: now
                        // });
                    //     sendFlag = false;
                    // }
                }
            }else{
                //出现问题
                console.log('error');
            }
        }
    });
    ws.on('close', (data) => {
        console.log('close='+data);
        logger.error('close='+data);
        init(oData);
    });
    ws.on('error', err => {
        console.log('error='+err);
        logger.error('error='+err);
        init(oData);
    });
};

module.exports = init;
