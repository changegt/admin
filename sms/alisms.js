/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 * 名称：${name}，比例：${percent}%，开始价格：${startprice}，当前价格:${nowprice}
 */
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

//发送短信
const send = (msg, type) => {
    //初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey});

    let phoneNum = '18757188917';
    if(typeof type != 'undefined' && type == 'admin'){
        //发送给管理员
        phoneNum = '18757188917';
    }

    smsClient.sendSMS({
        PhoneNumbers: '18757188917',
        SignName: '姚永芳',
        TemplateCode: 'SMS_122286906',
        TemplateParam: JSON.stringify(msg)
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
        }
    }, function (err) {
        console.log(err)
    });
};

module.exports = send;