var router = require('express').Router();
var passport = require('passport');

var User = require('./models/User');

var createSendToken = require('./services/jwt.js');
var four0four = require('./utils/404')();
var admin = require('./services/admin.js');
var facebookAuth = require('./services/facebookAuth.js');

//router.get('/person/:id', getPerson);


router.get('/admin', admin);
router.post('/register', passport.authenticate('local-register'), register);
router.post('/login', passport.authenticate('local-login'), login);
router.post('/auth/facebook', facebookAuth);
// make sure this is last
router.get('/*', four0four.notFoundMiddleware);
module.exports = router;

//////////////


// function getPerson(req, res, next) {
//     var id = +req.params.id;
//     var person = data.people.filter(function(p) {
//         return p.id === id;
//     })[0];
// 
//     if (person) {
//         res.status(200).send(person);
//     } else {
//         four0four.send404(req, res, 'person ' + id + ' not found');
//     }
// }

function register(req, res, next) {
    //emailVerification.send(req.user, res);
    console.log('register');
    createSendToken(req.user, res);
}

function login(req, res, next) {
    createSendToken(req.user, res);
}