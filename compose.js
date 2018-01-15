function a(next){
	console.log(1);
	next();
}

function b(next){
	next();
	console.log(2);
}

function c(next){
	console.log(3);
	next();
}

//通过promise实现
function compose(...args){
	let i = -1;
	
	var dispatch = function(i){
		if(args[i] && typeof args[i] == 'function'){
			//必须是函数
			const fn = args[i];
			if(!fn){
				//下面没有函数了
				return Promise.reject();
			}
			return Promise.resolve(fn(function(){ //生成一个proimise对象
				return dispatch(i+1);
			}));
		}
	}
	return dispatch(0);
}

var d1 = [a,b,c];
var e1 = compose(...d1);


/*
	作用：
		一个事件流
 */

function compose(args){
	let i = -1;
	
	var dispatch = function(i){
		if(args[i] && typeof args[i] == 'function'){
			//必须是函数
			const fn = args[i];
			if(!fn){
				//下面没有函数了
				return;
			}

			//非promise版
			return fn(function(){
				return dispatch(i+1);
			});

			//promise版见上
		}
	}
	return dispatch(0);
}

var a = function(next){
	console.log(1);
	next();
}

var b = function(next){
	console.log(3);
	next();
}

function c (next) {
	console.log(2);
	next();
}

var d = [a,b,c];
var e = compose(d);