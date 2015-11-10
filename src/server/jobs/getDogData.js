var request = require('request');
var jxon = require('jxon');
var mongoose = require('mongoose');
var Pet = require('../models/Pet.js');

connectToDB();
makeRequest();
function makeRequest(){
	var url = 'http://www.petango.com/webservices/wsadoption.asmx/AdoptableSearch?'+
		'authkey=uj36rnuzp324mmby22csi3mbfbt4y4p1h38ahympi8f5h6vyto&speciesID=&sex='+
		'&ageGroup=&location=&site=&onHold=&orderBy=&primaryBreed=&secondaryBreed='+
		'&specialNeeds=&noDogs=&noCats=&noKids=&stageID=';
	var urlDetails = 'http://www.petango.com/webservices/adoptablesearch/'+
			'wsAdoptableAnimalDetails.aspx?id=';
	request.get(url, function(err, response, body){

			console.log('started');
			var json = jxon.stringToJs(body).arrayofxmlnode.xmlnode;
			console.log('count: ' + json.length);
			for(var i = 0;  i < 100/*json.length - 1*/; i++){
				(function(_i){
				 	Pet.findOne({_id: json[_i].adoptablesearch.id}, function(err, pet){
					 if(err) {console.log(err);}
					 if(!pet){
						 request.get(urlDetails + json[_i].adoptablesearch.id, function(err, response, body){
							 if(err) {console.log('details error: ' + err);}
							 else {
								var info = parseHtml(body);
							 	var newPet = new Pet({
								 _id: info.id,
								 name: json[_i].adoptablesearch.name,
								 age: info.age,
								 color: info.color,
								 site: info.site,
								 species: info.species,
								 breed: info.breed,
								 sex: info.sex,
								 size: info.size,
								 declawed: info.declawed,
								 location: info.location,
								 intakeDate: info.intakeDate,
								 price: info.price,
								 description: info.description,
								 photo: json[_i].adoptablesearch.photo
							 });
							 
							 
							 newPet.save(function(err){
								 if (err) {console.log('save error: ' + err);}
								 else {console.log('success');}
							 });
							}
						 });
					 } else{
						 console.log('exists: ' + pet.name);
					 }
				 });
				})(i);
		}
	});
	
	function parseHtml(html) {
	html = html.substring(html.lastIndexOf('lblID') + 10);
	var id = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Species') + 9);
	var species = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Breed') + 7);
	var breed = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Age') + 5);
	var age = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Sex') + 5);
	var sex = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Size') + 6);
	var size = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Color') + 7);
	var color = html.slice(0, html.indexOf('</span>'));

	//add altered spayed/neutered


	html = html.substring(html.lastIndexOf('Declawed') + 10);
	var declawed = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Site') + 6);
	var site = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Location') + 10);
	var location = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('IntakeDate') + 12);
	var intakeDate = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Price') + 7);
	var price = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Description') + 13);
	var description = html.slice(0, html.indexOf('</span>'));
	return  {
		id: id,
		species: species,
		breed: breed,
		age: age,
		sex: sex,
		size: size,
		color: color,
		declawed: declawed,
		site: site,
		location: location,
		intakeDate: intakeDate,
		price: price,
		description: description
	};

	}
} 

function connectToDB(isDev /* is dev environment */){
    var connectionString = '';
    console.log('** Connecting to the database');
    if(isDev){
        connectionString = 'mongodb://admin:snotfalls@ds049104.mongolab.com:49104/pets';
    } else{
        connectionString = 'mongodb://admin:snotfalls@ds049104.mongolab.com:49104/pets';
    }
    mongoose.connect(connectionString);
}


	
