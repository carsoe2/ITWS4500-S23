const express = require("express");
const app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client/build/'));
app.use(express.static('public'));
app.use(express.static('build'));
app.use(express.static("routes"));
app.use(express.static('build'));
//app.use('client', require("client"))
//const recordRoutes = express.Router();
const cors = require("cors");
//require("dotenv").config({ path: "./config.env" });
//const port = process.env.PORT || 5000;
const port = 3000;
app.use(cors());
app.use(express.json());
//app.use(require("./routes/record"));
// get driver connection
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const uri = "mongodb+srv://carsoe2:krVXU2PP5HgveqOX@cluster0.nlabenv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//const dbo = require("./routes/record");
//const dbo = require("./db/conn");

// Handy redirect for local development
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
  /*
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  */
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
app.get('/db', async function (req, res) {
  await client.connect();
  let db_connect = client.db("famousPeople").collection("famousPeople");
  const dbRes = await db_connect.find();
  const dbArr = await dbRes.toArray();
  //console.log(dbArr);
  res.status(200).send(dbArr);
});

// This section will help you get a single record by id
app.get("/db/:id", async function (req, res) {
  await client.connect();
  let db_connect = client.db("famousPeople").collection("famousPeople");
  //let myquery = { _id: new ObjectId(parseInt(req.params.id)) };
  let myquery = { _id: req.params.id };
  const dbRes = await db_connect.findOne(myquery);
  if (dbRes) {
    res.status(200).send(dbRes);
  } else {
    res.status(200).send("{}");
  }
});

// This section will help you create a new record.
app.post("/db/add", async function (req, response) {
  await client.connect();
  let db_connect = client.db("famousPeople");
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
  db_connect.collection("famousPeople").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.status(200).json(res);
  });
});

// This section will help you update a record by id.
app.put("/db/update/:id", async function (req, response) {//put
  await client.connect();
  let db_connect = client.db("famousPeople");
  let myquery = { _id: decodeURI(req.params.id) };
  let newvalues = {
    $set: {
      results: req.body.results
    },
  };
  db_connect
    .collection("famousPeople")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.status(200).json(res);
    });
});

// This section will help you delete a record
app.delete("/db/:id", async (req, response) => {
  await client.connect();
  let db_connect = client.db("famousPeople").collection("famousPeople");
  let myquery = { _id: req.params.id };
  await db_connect.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(200).json(obj);
  });
});