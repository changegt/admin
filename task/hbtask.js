//执行获取数据脚本
module.exports = function(){
    //length 144
    var hbStr = {
        usdt: 'btcusdt,bchusdt,xrpusdt,ethusdt,ltcusdt,dashusdt,eosusdt,etcusdt,omgusdt,zecusdt,cvcusdt,storjusdt,gntusdt,qtumusdt,hsrusdt,neousdt,sntusdt'.split(','),     //17

        btc1: 'bchbtc,xrpbtc,ethbtc,ltcbtc,dashbtc,eosbtc,etcbtc,omgbtc,zecbtc,adxbtc,evxbtc,utkbtc,dtabtc,letbtc,thetabtc,xembtc,appcbtc,iostbtc,yeebtc,chatbtc'.split(','),
        btc2: 'datbtc,ostbtc,qunbtc,aidocbtc,topcbtc,actbtc,dbcbtc,rpxbtc,swftcbtc,powrbtc,reqbtc,qtumbtc,hsrbtc,smtbtc,elfbtc,venbtc,waxbtc,itcbtc,icxbtc,cvcbtc,rcnbtc'.split(','),
        btc3: 'sntbtc,nasbtc,saltbtc,cmtbtc,gasbtc,kncbtc,storjbtc,neobtc,batbtc,qspbtc,rdnbtc,btmbtc,mcobtc,tntbtc,tnbbtc,manabtc,paybtc,zrxbtc,mtlbtc,qashbtc,gntbtc,astbtc'.split(','),
        btc4: 'dgdbtc,wiccbtc,gnxbtc,mdsbtc,propybtc,sbtcbtc,btgbtc,bcdbtc,bifibtc,bcxbtc,bt1btc,bt2btc'.split(','),

        eth1: 'eoseth,omgeth,adxeth,evxeth,utketh,dtaeth,leteth,thetaeth,appceth,iosteth,yeeeth,chateth,dateth,dbceth,osteth,quneth,aidoceth,topceth,acteth,swftceth'.split(','),    //52
        eth2: 'powreth,reqeth,qtumeth,wicceth,propyeth,gnxeth,mdseth,hsreth,smteth,elfeth,veneth,waxeth,itceth,icxeth,cvceth,rcneth,naseth,salteth,cmteth,gaseth,bateth'.split(','),    //52
        eth3: 'rdneth,qspeth,btmeth,mcoeth,tnteth,tnbeth,manaeth,payeth,qasheth,gnteth,dgdeth'.split(','),    //52
    }

    const hbTask = require('../sockets/hbsocket');

    // hbTask(hbStr.usdt);

    hbTask(hbStr.btc1);
    hbTask(hbStr.btc2);
    hbTask(hbStr.btc3);
    hbTask(hbStr.btc4);

    hbTask(hbStr.eth1);
    hbTask(hbStr.eth2);
    hbTask(hbStr.eth3);
};

