var Links = require('../models/links');


exports.all = function(req,res){
	Links.all(req.params.id, function(err,docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		return res.send(docs);		
	})
}

exports.findById = function(req,res){
	Links.findById(req.params.id, 
					function(err,doc){
						if(err){
							console.log(err);
							return res.sendStatus(500);
						}
						res.send(doc);				
					})
	}

exports.create = function(req,res){
	var newLink ={
			name: req.body.name,
			urlShort: req.body.urlShort,
			longUrl: req.body.longUrl,
			user: req.body.user
		};
	Links.create(newLink,	
		function(err,result){
			if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(newLink);
		})
}
exports.update = function(req,res){
		Links.update(req.params.id,
			{
				name: req.body.name,
				img: req.body.img, 
				urlShort: req.body.urlShort,
				user: req.body.user
			},	
			function(err,result){
				if(err){
					console.log(err);
					return res.sendStatus(500);
				}
				return res.sendStatus(200);
			})
}

exports.delete = function(req,res){
	Links.delete(req.params.user,req.params.id,
					function(err,result){
						if(err){
							console.log(err);
							return res.sendStatus(500);
						}
						return res.sendStatus(200);
					})
}