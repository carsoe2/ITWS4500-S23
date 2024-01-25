const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
//const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const {MongoClient, ServerApiVersion} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const uri = "mongodb+srv://carsoe2:krVXU2PP5HgveqOX@cluster0.nlabenv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main() {
  try {
		await client.connect();
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

// This section will help you get a list of all the records.
recordRoutes.route("/db").get(async function (req, res) {
  await client.connect();
  let db_connect = client.db("famousPeople");
  db_connect
    .collection("famousPeople")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/db/:id").get(async function (req, res) {
  await client.connect();
  let db_connect = client.db("famousPeople");
  let myquery = { _id: new ObjectId(parseInt(req.params.id)) };
  db_connect
    .collection("famousPeople")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/db/add").post(async function (req, response) {
  await client.connect();
  let db_connect = client.db("famousPeople");
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection("famousPeople").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/db/update/:id").post(async function (req, response) {
  await client.connect();
  let db_connect = client.db("famousPeople");
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("famousPeople")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/db/:id").delete(async (req, response) => {
  await client.connect();
  let db_connect = client.db("famousPeople");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("famousPeople").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;