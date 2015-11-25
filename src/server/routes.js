var router = require('express').Router();
var passport = require('passport');

var createSendToken = require('./services/jwt.js');
var four0four = require('./utils/404')();
var data = require('./data');
var Pet = require('./models/Pet');
var User = require('./models/User');

var admin = require('./services/admin.js');
var facebookAuth = require('./services/facebookAuth.js');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/pets', getPets);
router.get('/admin', admin);
router.get('/*', four0four.notFoundMiddleware);
router.post('/register', passport.authenticate('local-register'), register);
router.post('/login', passport.authenticate('local-login'), login);
router.post('/auth/facebook', facebookAuth);

module.exports = router;

//////////////

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function getPets(req, res, next) {
    Pet.find({}, function(err, pets) {
		  if (err) {
		      	res.status(500).send({message: 'problem getting pets'});
		  }
		  res.status(200).json(pets);
	});
}
function register(req, res, next) {
    //emailVerification.send(req.user, res);
    console.log('register');
    createSendToken(req.user, res);
}

function login(req, res, next) {
    createSendToken(req.user, res);
}