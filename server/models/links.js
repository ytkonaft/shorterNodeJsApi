var ObjectID = require('mongodb').ObjectID,
		db = require('../db.js');

exports.all = function(callback){
	db.get().collection('links')
		.find().toArray((err,docs)=>callback(err,docs));
}
exports.findById = function(id,callback){
		db.get().collection('links')
			.findOne({'_id': ObjectID(id)},
							(err,doc) => callback(err,doc));
	}
exports.create = function(newLink,callback){
		db.get().collection('links')
			.insert(newLink,
							(err,result)=>callback(err,result))
}
exports.update = function(id,newData,callback){
				db.get().collection('links')
					.updateOne({'_id':ObjectID(id)},
											newData,
											(err,result)=>callback(err,result));
}
exports.delete = function(id, callback){
					db.get().collection('links')
						.deleteOne({ '_id': ObjectID(id)},
							(err,result)=>callback(err,result));
}