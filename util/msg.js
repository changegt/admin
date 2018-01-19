module.exports.successObj = {
	errorCode: 0,
	errorMsg: 'success',
	result: {}
};

module.exports.errorObj = {
	errorCode: -1,
	errorMsg: 'error',
	result: {}
};

module.exports.sucObj = function(){
	return {
		errorCode: 0,
		errorMsg: 'success',
		result: {}		
	};
};

module.exports.errObj = function(){
	return {
		errorCode: -1,
		errorMsg: 'error',
		result: {}
	};
};