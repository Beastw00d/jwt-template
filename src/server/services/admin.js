var jwt = require('jwt-simple');

// TODO GET REAL DATA
var admin = {
	id: 0,
	name: 'Chris',
	favoriteAnimal: 'Dog'
};

module.exports = function (req, res, next) {	
	 if (!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized'
	 	});
	 }
	 var token = req.headers.authorization.split(' ')[1];
	 var payload = jwt.decode(token, 'shhh..');
	
	 if (!payload.sub) {
		res.status(401).send({
			message: 'Authentication failed'
		});
	}

	res.status(200).send(admin);
};
