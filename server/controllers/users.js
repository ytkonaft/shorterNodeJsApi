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
				if(!!response) throw 'EMAIL_IS_EXIST';
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
				case 'EMAIL_IS_EXIST': 
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
	if(!req.body.mail ) return res.sendStatus(420);
	if(!req.body.pass) return res.sendStatus(421);

	Users.checkEmail(req.body.mail)
		.then(resolve=>	{
			if(!resolve){
				res.sendStatus(404)
				throw 404;
			}else{
				if(resolve.pass === sha1(req.body.pass)){
					res.send(resolve._id);
				}else{
					res.sendStatus(401)
					throw 401;					
				}
			}
		},
		reject=> console.log(reject))
		.catch((err)=>console.log(err));	

}
