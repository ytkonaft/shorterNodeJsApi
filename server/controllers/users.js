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
		.then((response)=>{
				if(!!response) throw 111;
			})
		.then(()=>{
				Users.create(newUser,	
					function(err,result){
						if(err){
							return res.sendStatus(500);
							throw 222;
						}
						res.send(newUser);
				})					
			})
		.catch((err)=>{
			switch(err){
				case 111: 
					res.sendStatus(422);
					break;
				case 222: 
					res.sendStatus(500);
					break;
			}
		})
}
exports.login = function(req,res){
	if(!req.body.mail && !req.body.pass) return res.sendStatus(422);

	Users.checkEmail(req.body.mail)
		.then((response)=>{
				if(response && response.pass === sha1(req.body.pass)){
					res.send(response._id);
				}else{
					res.sendStatus(401);
					throw 401;
				}
			},(rej)=>{
					res.sendStatus(404);
					throw 404;				
			})
		.catch((err)=>console.log(err));	

}