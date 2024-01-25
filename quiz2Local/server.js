const express = require("express");
const app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client/build/'));
const cors = require("cors");
const port = 3000;
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require("mongodb");
//const ObjectId = require("mongodb").ObjectId;
const uri = "mongodb+srv://carsoe2:krVXU2PP5HgveqOX@cluster0.nlabenv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();

app.use((req, res, next) => {
    if (!req.url.startsWith('/node/')) {
        next();
        return;
    }
    res.redirect(307, req.url.substring(5));
    next();
});

app.listen(port, () => {
    // perform a database connection when server starts
    main().catch(console.error);
    console.log(`Server is running on port: ${port}`);
});

async function main() {
    try {
        await client.connect();
    } catch (e) {
        console.error(e);
    } finally {
        client.close();
    }
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/client/build/");
});

// This section will help you get a list of all the records.
app.get('/quiz2', async function (req, res) {
    await client.connect();
    let db_connect = client.db("famousPeople").collection("lab6");
    const dbRes = db_connect.find();
    const dbArr = await dbRes.toArray();
    //console.log(dbArr);
    res.status(200).send(dbArr);
});

// This section will help you create a new record.
app.post("/quiz2/add", async function (req, response) {
    await client.connect();
    let db_connect = client.db("famousPeople").collection("lab6");
    let myobj = {
        results: [{
            name: req.body.name,
            title: req.body.title,
            info: {
                born: req.body.born,
            }
        }],
        _id: req.body.name
    };
    const count = await client.db("famousPeople").collection("lab6").count({ _id: req.body.name });
    if (count == 0) {
        await db_connect.insertOne(myobj, function (err, res) {
            if (err) throw err;
            response.status(200).json(res);
        });
    } else {
        console.log("Item not added");
    }

});

//Add from famous people api
app.post("/quiz2/addFamous", async function (req, response) {
    await client.connect();
    var name = req.body.name;
    var url = 'https://api.api-ninjas.com/v1/historicalfigures?name=' + name;
    xhr = new XMLHttpRequest();
    var done = 0;
    xhr.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            await client.connect();
            const jsonObj = JSON.parse("{\"_id\":\"" + name + "\",\n\"results\":" + this.responseText + "}");
            console.log(jsonObj);
            var id = jsonObj._id;
            const count = await client.db("famousPeople").collection("lab6").count({ _id: id });
            if (count === 0) {
                const result = await client.db("famousPeople").collection("lab6").insertOne((jsonObj));
                console.log(result.insertedId);
                client.close();
                response.writeHead(301, {
                    Location: `http://localhost:3000/`
                }).end();
            } else {
                console.log("Item not added");
            }
        }
        response.status(200);
    };

    xhr.open("GET", url, true);
    xhr.setRequestHeader('X-Api-Key', 'E5nOBLo1FmwSitMmgxc1jw==WzAx596qUKu8jN78');
    xhr.send();
});

//Add from celebrity api
app.post("/quiz2/addCelebrity", async function (req, response) {
    await client.connect();
    let db_connect = client.db("famousPeople").collection("lab6");
    var name = req.body.name;
    var url = 'https://api.api-ninjas.com/v1/celebrity?name=' + name;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            await client.connect();
            const res = JSON.parse(this.responseText);
            var singer;
            var title;
            var born;
            try {
                singer = res[0].name;
                title = res[0].occupation[0];
                born = res[0].birthday;
                if (singer) {
                    const jsonObj = JSON.parse("{\"_id\":\"" + singer + "\",\n\"results\":[{\"name\":\"" + singer
                        + "\",\n\"title\":\"" + title + "\",\n\"info\":{\"born\":\"" + born + "\"}}]\n}");
                    console.log(jsonObj);
                    var id = jsonObj._id;
                    const count = await client.db("famousPeople").collection("lab6").count({ _id: id });
                    if (count === 0) {
                        const result = await client.db("famousPeople").collection("lab6").insertOne((jsonObj));
                        console.log(result.insertedId);
                    } else {
                        console.log("Item not added");
                    }
                }
            } catch (e) { console.log(e); }

        }
    };

    xhr.open("GET", url, true);
    xhr.setRequestHeader('X-Api-Key', 'E5nOBLo1FmwSitMmgxc1jw==WzAx596qUKu8jN78');
    xhr.send();
});

//Add from superhero api
app.post("/quiz2/addHero", async function (req, response) {
    await client.connect();
    var name = req.body.name;
    var url = 'https://www.superheroapi.com/api/527152966244459/search/' + name;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            await client.connect();
            const res = JSON.parse(this.responseText);
            var hero;
            var title;
            var born;
            if (res.results) {
                for (r of res.results) {
                    try {
                        hero = r.biography["full-name"];
                        title = r.name;
                        born = r.biography["place-of-birth"];
                    } catch (e) { console.log(e); }
                    if (hero) {
                        const jsonObj = JSON.parse("{\"_id\":\"" + hero + "\",\n\"results\":[{\"name\":\"" + hero
                            + "\",\n\"title\":\"" + title + "\",\n\"info\":{\"born\":\"" + born + "\"}}]\n}");
                        console.log(jsonObj);
                        var id = jsonObj._id;
                        const count = await client.db("famousPeople").collection("lab6").count({ _id: id });
                        if (count === 0) {
                            const result = await client.db("famousPeople").collection("lab6").insertOne((jsonObj));
                            console.log(result.insertedId);
                        } else {
                            console.log("Item not added");
                        }
                    }
                }
            }

        }
    };

    xhr.open("GET", url, true);
    xhr.send();
});

//Add from actor api
app.post("/quiz2/addActor", async function (req, response) {
    await client.connect();
    var name = req.body.name;
    var url = 'https://actor-movie-api1.p.rapidapi.com/getid/' + encodeURI(name) + '?apiKey=62ffac58c57333a136053150eaa1b587';
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            await client.connect();
            const res = JSON.parse(this.responseText);
            var hero;
            var title;
            var born;
            try {
                for (r of res) {
                    title = r["original_title"];
                    born = r["release_date"];
                    if (title) {
                        const jsonObj = JSON.parse("{\"_id\":\"" + name + "\",\n\"results\":[{\"name\":\"" + name
                            + "\",\n\"title\":\"" + title + "\",\n\"info\":{\"born\":\"" + born + "\"}}]\n}");
                        const count = await client.db("famousPeople").collection("lab6").count({ _id: name });
                        if (count === 0) {
                            const result = await client.db("famousPeople").collection("lab6").insertOne((jsonObj));
                            console.log(result.insertedId);
                        } else {
                            console.log("Item not added");
                        }
                    }
                }
            } catch (e) { console.log(e); }
        }
    };

    xhr.open("GET", url, true);
    xhr.setRequestHeader("X-RapidAPI-Key", "1444ab27c7msh1395f90543dd378p16ed63jsn1cfefb4aac86");
    xhr.setRequestHeader("X-RapidAPI-Host", "actor-movie-api1.p.rapidapi.com");
    xhr.send();
});

// This section will help you update a record by id.
app.put("/quiz2/update/:id", async function (req, response) {
    await client.connect();
    let db_connect = client.db("famousPeople").collection("lab6");
    let myquery = { _id: decodeURI(req.params.id) };
    let newvalues = {
        $set: {
            results: req.body.results
        },
    };
    await db_connect.updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.status(200).json(res);
    });
});

// This section will help you delete a record
app.delete("/quiz2/:id", async (req, response) => {
    await client.connect();
    let db_connect = client.db("famousPeople").collection("lab6");
    let myquery = { _id: req.params.id };
    await db_connect.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.status(200).json(obj);
    });
});