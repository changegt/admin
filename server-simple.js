const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const jsonp = require('koa-safe-jsonp');
jsonp(app, {
	callback: 'callback',
	limit: 50
});

router
	.get('/login', (ctx) => {
		const username = ctx.request.query['username'];
		const password = ctx.request.query['password'];

		var json = {
			errorCode : -1,
			errorMsg : 'fail'
		};

		if(username == 'yyf' && password == '123456'){
			json = {
				errorCode : 0,
				errorMsg : 'success'
			};
		}
		console.log(11111111);
		ctx.jsonp = json;
	});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(3000);
