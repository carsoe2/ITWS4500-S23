var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require("fs");

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css/style.css'));
app.use('/resources', express.static(__dirname + '/public/resources'));
app.use('/js', express.static(__dirname + '/public/js'));

// server route handler
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

//alt get method for showing all names in names.json
app.get('/names', function (req, res) {
	try {
		const jsonStr = require('./public/js/names.json');
		res.status(200).send(JSON.stringify(jsonStr));
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

//primary get method which makes an external API call to return person data
app.get('/v1/:person', function (req, res) {
	var name = req.params.person;
	var url = 'https://api.api-ninjas.com/v1/historicalfigures?name=' + name;
	fetch(url, {
		method: 'GET',
		headers: {
			'X-Api-Key': 'E5nOBLo1FmwSitMmgxc1jw==WzAx596qUKu8jN78'
			//'X-Api-Key': 'a/e3cbi0xFk+ktXlvB/yjg==53S6I51lUkFly44g'
		}
	})
		.then(response => response.json())
		.then(response => res.status(200).send(response))
		.catch(err => res.status(500).send(err));
});

//post method
//adds a json object of a person to names.json
app.get('/v1/addPerson/:person/:fname/:lname', function (req, res) {
	try {
		var name = req.params.person;
		var fname = req.params.fname;
		var lname = req.params.lname;
		var obj = {
			"fname": fname,
			"lname": lname
		};
		var data = fs.readFileSync(__dirname + "/public/js/names.json");
		var object = JSON.parse(data);
		object.body.push(obj);
		fs.writeFile("./public/js/names.json", JSON.stringify(object), function (err) {
			if (err) throw err;
			console.log('complete');
		});
		res.status(200).send(object);
	} catch (e) {
		res.status(500).send(e);
		console.log(e);
	}
});

//delete method which takes the index of a person and deletes it from the json file
app.get('/v1/deletePerson/:id', function (req, res) {
	try {
		var id = req.params.id;
		var data = fs.readFileSync(__dirname + "/public/js/names.json");
		var object = JSON.parse(data);
		object.body.splice(id, 1);
		fs.writeFile("./public/js/names.json", JSON.stringify(object), function (err) {
			if (err) throw err;
		});
		res.status(200).send(JSON.stringify(object));
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

//put method NOTE: USE v2 FOR PUT
app.put('/v2/put', function (req, res) {
	try {
		res.status(200).send("Put request received");
		console.log("Put request received");
	} catch (e) {
		res.status(500).send(e);
		console.log(e);
	}
});

//send 404 error if incorrect page entered
app.get('*', (req, res, next) => {
	let err = new Error('There was an error in accessing the page you wanted');
	res.status(404).send(err);
});

// start server
http.listen(3000, function () {
	console.log('Server up on *:3000');
});