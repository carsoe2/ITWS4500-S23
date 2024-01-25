const { response } = require('express');
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

//second get method that returns college info
app.get('/v2/:college', function (req, res) {
	var name = req.params.college;
	var url = 'http://universities.hipolabs.com/search?name=' + name + '&country=United%20States';

	/*
	req2.onreadystatechange = function () {
        if (this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
			fs.writeFile("./public/js/names.json", jsonObj, function (err) {
				if (err) throw err;
			});
            console.log(url);
            res.status(200).send(jsonObj)
        } else {
            console.log("error");
			res.status(500).send(err)
        }
    };

    //get data from custom url
    req2 = new XMLHttpRequest();
    req2.open("GET", url, true);
    req2.send();
	*/
	
	fetch(url, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(response => res.status(200).send(response))
		.catch(err => res.status(500).send(err));
	
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