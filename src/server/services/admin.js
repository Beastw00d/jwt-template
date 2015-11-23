var jwt = require('jwt-simple');

module.exports = function (req, res, next) {
	
	console.log(req.headers);
	
	 if (!req.headers.authorization) {
		return res.status(401).send({
			description: 'You are not authorized'
	 	});
	 }
	 var token = req.headers.authorization.split(' ')[1];
	 var payload = jwt.decode(token, "shhh..");
	
	 if (!payload.sub) {
		res.status(401).send({
			description: 'Authentication failed'
		});
	}
	
	
	
	
	res.status(200).send(admin);
}

//TODO get from database

var admin = {
	id: 0,
	name: 'Chris',
	favorite_animal: 'Dog'
};