/*
    1、由于ok的websocket是可以配置获取所有的数据，所以导致1分钟内可能存在相同的一个目标数据被获取多次，所以现在需要一个机制【1分钟内相同的目标的币币交易只有第一次会被发送短信】
        解决方案：配置文件minwrite.json文件记录对应的币币交易的分钟的时间戳，同一分钟判断是否已经存在当前时间戳
 */

const WebSocket = require('ws');
const send = require('../sms/alisms');
const fs = require('fs');
const logger = require('./log');
const chalk = require('chalk');

const WS_URL = 'wss://real.okex.com:10441/websocket';

let name, start, now, binum, percent, time;
let sendFlag = true;

function subscribe(ws, oData) {
    // 订阅K线
    ws.send(JSON.stringify(oData));
}

var init = (oData, minwrite) => {
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
                name = arr[0].channel.split('spot_')[1].split('_kline')[0];
                start = arr[0].data[arr[0].data.length-1][1];
                now = arr[0].data[arr[0].data.length-1][4];
                binum = arr[0].data[arr[0].data.length-1][5];
                percent = parseFloat((now - start) / start * 100).toFixed(2);
                time = parseInt(new Date().getTime()/60000);
                if(Math.abs(percent) >= 10 && time > minwrite[name]){
                    minwrite[name] = time;
                    fs.writeFileSync('./task/minwrite.json', JSON.stringify(minwrite), 'utf-8');
                    console.log('【okex---'+name+'】比例：'+percent+'%-----开始价格：'+start+'，当前价格:'+now);

                    // if(sendFlag){
                        // send({
                        //     name: 'okex---'+name,
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
                logger.error('okerror='+data);
            }
        }
    });
    ws.on('close', (data) => {
        console.log('okclose='+data);
        logger.error('okclose='+data);
        init(oData, minwrite);
    });
    ws.on('error', err => {
        console.log('okerror='+err);
        logger.error('okerror='+err);
        init(oData, minwrite);
    });
};

module.exports = init;
