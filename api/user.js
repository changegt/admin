const fs = require('fs');

module.exports = {
	validate (name, password) {
		const user = this.getUser(name);
		if(!!user && user.password == password){
			return user;
		}else{
			return false;
		}
	},

	getUser (name) {
		const user = eval('('+fs.readFileSync('./user.json', 'utf-8')+')');
		return user;
	}
}