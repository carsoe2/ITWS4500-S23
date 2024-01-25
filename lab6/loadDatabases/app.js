var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
var people = require("./list100.json");

var req2;

const { MongoClient, ServerApiVersion } = require('mongodb');
async function main() {
	const uri = "mongodb+srv://carsoe2:krVXU2PP5HgveqOX@cluster0.nlabenv.mongodb.net/?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

	try {
		await client.connect();
		//await listDatabases(client);
		await add100Data(client);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

async function createEntry(client, jsonObj) {
	await client.connect();
	console.log(jsonObj);
	var id = jsonObj._id;
	var count = await client.db("famousPeople").collection("lab6").count({ _id: id });
	if (count === 0) {
		const result = await client.db("famousPeople").collection("lab6").insertOne((jsonObj));
		console.log(result.insertedId);
	}
}

async function add100Data(client) {
	var names = people.names;
	await client.connect();
	for (const name of names) {
		var url = 'https://api.api-ninjas.com/v1/historicalfigures?name=' + name;
		req2 = new XMLHttpRequest();
		req2.onreadystatechange = async function () {
			if (this.readyState == 4 && this.status == 200) {
				await client.connect();
				const count = await client.db("famousPeople").collection("lab6").count() + 1;
				console.log(count);
				const jsonObj = JSON.parse("{\"_id\":\"" + count + "\",\n\"results\":" + this.responseText + "}");
				createEntry(client, jsonObj);
				//client.close();
			}
		};

		req2.open("GET", url, true);
		req2.setRequestHeader('X-Api-Key', 'E5nOBLo1FmwSitMmgxc1jw==WzAx596qUKu8jN78');
		req2.send();
	}
}

async function listDatabases(client) {
	const dbList = await client.db().admin().listDatabases();
	console.log("Databases:");
	dbList.databases.forEach(db => {
		console.log(`- ${db.name}`);
	})
}