//执行获取数据脚本


var hbStr = {
    usdt: 'btcusdt,bchusdt,xrpusdt,ethusdt,ltcusdt,dashusdt,eosusdt,etcusdt,omgusdt,zecusdt,cvcusdt,storjusdt,gntusdt,qtumusdt,hsrusdt,neousdt,sntusdt',

    btc: 'bchbtc,xrpbtc,ethbtc,ltcbtc,dashbtc,eosbtc,etcbtc,omgbtc,zecbtc,adxbtc,evxbtc,utkbtc,dtabtc,letbtc,thetabtc,xembtc,appcbtc,iostbtc,yeebtc,chatbtc,datbtc,ostbtc,qunbtc,aidocbtc,topcbtc,actbtc,dbcbtc,rpxbtc,swftcbtc,powrbtc,reqbtc,qtumbtc,hsrbtc,smtbtc,elfbtc,venbtc,waxbtc,itcbtc,icxbtc,cvcbtc,rcnbtc,sntbtc,nasbtc,saltbtc,cmtbtc,gasbtc,kncbtc,storjbtc,neobtc,batbtc,qspbtc,rdnbtc,btmbtc,mcobtc,tntbtc,tnbbtc,manabtc,paybtc,zrxbtc,mtlbtc,qashbtc,gntbtc,astbtc,dgdbtc,wiccbtc,gnxbtc,mdsbtc,propybtc,sbtcbtc,btgbtc,bcdbtc,bifibtc,bcxbtc,bt1btc,bt2btc',

    eth: 'eoseth,omgeth,adxeth,evxeth,utketh,dtaeth,leteth,thetaeth,appceth,iosteth,yeeeth,chateth,dateth,dbceth,osteth,quneth,aidoceth,topceth,acteth,swftceth,powreth,reqeth,qtumeth,wicceth,propyeth,gnxeth,mdseth,hsreth,smteth,elfeth,veneth,waxeth,itceth,icxeth,cvceth,rcneth,naseth,salteth,cmteth,gaseth,bateth,rdneth,qspeth,btmeth,mcoeth,tnteth,tnbeth,manaeth,payeth,qasheth,gnteth,dgdeth'
}

let num = 0;
const hbTask = require('./sockets/hbsocket');
var Arr = hbStr.usdt.split(',');
// Arr.forEach((item) => {
//     setTimeout(() => {
//         hbTask(item);
//     }, 1000);
// });
// 

hbTask('btcusdt');