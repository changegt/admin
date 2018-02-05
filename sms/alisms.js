/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 * 名称：${name}，比例：${percent}%，开始价格：${startprice}，当前价格:${nowprice}
 */
const fs = require('fs');
const path = require('path');
const SMSClient = require('@alicloud/sms-sdk');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = '6h15Xd4YExhzIWRI';
const secretAccessKey = 'V9WF1jC695umL5UPJJBrsiTDzXiV52';

/**
 * let msg = {
        name: '',
        percent: 
        startprice:
        nowprice:
    }

    adminmsg = {
        msg: '接口出错'
    }
 */

const templateArr = ['SMS_122294925','SMS_123665052','SMS_122294923','SMS_123665049','SMS_122294922','SMS_123670044','SMS_123670043','SMS_122293300','SMS_122297834','SMS_122292801','SMS_122287804'];
const adminMsgTpl = 'SMS_122286906'; //通知管理员的消息
// const phoneNum = '18757188917';
const phoneNum = '18586813408,17816873197,18757188917';
const smsClient = new SMSClient({accessKeyId, secretAccessKey});

//发送短信
const send = (msg, type) => {
    //初始化sms_client
    let templateObj = templateArr[0]; //默认用第一个末班，或者异常的时候用第一个末班
    try{
        let num = eval('('+fs.readFileSync( path.join(path.resolve(),'sms/templateNum.json'),'utf8')+')').num; //获取调用末班次数
        templateObj = templateArr[( num % templateArr.length )]; //获取下次调用末班类型
        num++;
        fs.writeFileSync(path.join(path.resolve(),'sms/templateNum.json'), JSON.stringify({"num": num}) , 'utf8'); //将本次叠加后的调用数量写入文件中
    }catch(e){

    }

    if(typeof type != 'undefined' && type == 'admin'){
        //发送给管理员
        phoneNum = '18757188917';
    }

    smsClient.sendSMS({
        PhoneNumbers: phoneNum,
        SignName: '姚永芳',
        TemplateCode: templateObj,
        TemplateParam: JSON.stringify(msg)
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err);
    });
};

module.exports = send;
