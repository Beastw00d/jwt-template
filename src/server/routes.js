var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var Pet = require('./models/Pet');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/pets', getPets);
router.get('/*', four0four.notFoundMiddleware);

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