var express = require('express'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		config = require('./src/etc/config.json'),		
		MongoClient = require('mongodb').MongoClient,
		ObjectID = require('mongodb').ObjectID,
		db = require('./server/db.js'),
		LinksController = require('./server/controllers/links'),
		app = express();


		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended:true}));
		app.use(cors({origin: '*'})); 


	app.get('/all/', LinksController.all)

	app.get('/find/:id', LinksController.findById)

	app.post('/add/', LinksController.create)

	app.put('/update/:id', LinksController.update)

	app.delete('/delete/:id', LinksController.delete)



db.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, function(err){
	if(err) return console.log(err);
	app.listen(3000, ()=>console.log('server is runing in ' + config.serverPort));	
})