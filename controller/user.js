/*
	user处理
 */

const router = require('koa-router')();
const {successObj, errorObj} = require('../util/msg');
const api_user = require('../api/user');

const validate = async (ctx, next) => {
	//缓存是否匹配
	const username = ctx.cookies.get('username');
	const returnObj = api_user.getUser(username);

	if(username == ctx.cookies.get('username', {signed: true}) && !!returnObj){
		successObj.result = {
			username: username,
			avatar: returnObj.avatar,
			token: username
		};
		ctx.jsonp = successObj;
	}else{
		next();
	}
};

const login = async (ctx, next) => {
	const username = ctx.request.query.username;
	const password = ctx.request.query.password;
	const returnObj = api_user.validate(username, password);

	if(returnObj){
		ctx.cookies.set('username', username, { signed: true });
		ctx.cookies.set('uid', returnObj.uid , { signed: true });
		successObj.result = {
			username: username,
				avatar: '1.png',
				token: username
		}
		ctx.jsonp = successObj;
	}else{
		next();
	}
};

module.exports = {
	'/getinfo' : validate,
	'/login' : login
};

// router
// 	.get('/getinfo', (ctx, next) => {
// 		//缓存是否匹配
// 		const username = ctx.cookies.get('username');
// 		const returnObj = api_user.getUser(username);

// 		if(username == ctx.cookies.get('username', {signed: true}) && !!returnObj){
// 			successObj.result = {
// 				username: username,
// 				avatar: returnObj.avatar,
// 				token: username
// 			};
// 			ctx.jsonp = successObj;
// 		}else{
// 			next();
// 		}
// 	})
// 	.get('/login', (ctx, next) => {
// 		const username = ctx.request.query.username;
// 		const password = ctx.request.query.password;
// 		const returnObj = api_user.validate(username, password);

// 		if(returnObj){
// 			ctx.cookies.set('username', username, { signed: true });
// 			ctx.cookies.set('uid', returnObj.uid , { signed: true });
// 			successObj.result = {
// 				username: username,
// 					avatar: '1.png',
// 					token: username
// 			}
// 			ctx.jsonp = successObj;
// 		}else{
// 			next();
// 		}
// 	});
// module.exports = router;

