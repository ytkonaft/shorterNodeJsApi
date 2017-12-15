var ObjectID = require('mongodb').ObjectID,
		db = require('../db.js');


exports.create = function(newUser,callback){
		db.get().collection('users')
			.insert(newUser,
							(err,result)=>callback(err,result))
}

exports.checkEmail = function(email,callback){
		if(email === '') {
			console.log('zazaz');
			return;
		}
		var answ = db.get().collection('users')
			.findOne({'mail': email});
			return answ;
}
// exports.login = function(newUser,callback){
// 		db.get().collection('users')
// 			.insert(newUser,
// 							(err,result)=>callback(err,result))
// }