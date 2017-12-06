var ObjectID = require('mongodb').ObjectID,
		db = require('../db.js');


exports.create = function(newUser,callback){
		db.get().collection('users')
			.insert(newUser,
							(err,result)=>callback(err,result))
}

exports.checkEmail = function(email,callback){
		var answ = db.get().collection('users')
			.findOne({'mail': email});
			return answ;
}