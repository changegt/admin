const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

//keygrip  cookies密匙
const Keygrip = require('keygrip');
app.keys = new Keygrip(['im a newer secret', 'i like turtle'], 'sha256');

//配置jsonp
const jsonp = require('koa-safe-jsonp');
jsonp(app, {
	callback: 'callback', //设置默认callback参数
});

//common errorObj
const {errorObj} = require('./util/msg');

//遍历controller里面的所有路由
const router = require('koa-router')();
const controllerList = fs.readdirSync('./controller');

for (var i = 0; i < controllerList.length; i++) {
	const thisControllerName = controllerList[i].split('.js')[0];
	const thispath = './controller/'+thisControllerName;
	const mapping = require(thispath);
	for (var j in mapping) {
		const url = '/'+thisControllerName+j; //将当前的controller的name设置为url前一级
		const func = mapping[j];
		router.get(url, func);
	}
}

app
	.use(router.routes())
	.use(router.allowedMethods())
	.use(async (ctx, next) => {
		ctx.jsonp = errorObj;
	});

app.listen(3000);
