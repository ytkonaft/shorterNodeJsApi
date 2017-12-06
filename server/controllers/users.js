var Users = require('../models/users'),
	sha1 = require('sha1');


exports.create = function(req,res){
	if(!req.body.mail && !req.body.pass){
		return res.sendStatus(422);
	} 
	var hashPass =  sha1(req.body.pass),
		newUser ={
			mail: req.body.mail,
			pass: hashPass
		};	
	Users.checkEmail(req.body.mail)
		.then((res)=>{
			if(!!res){
				return res.sendStatus(422);
			}
		},(err)=>console.log(err));



	// Users.create(newUser,	
	// 	function(err,result){
	// 		if(err){
	// 			return res.sendStatus(500);
	// 		}
	// 		res.send(newUser);
	// })		
}