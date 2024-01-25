
const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
var month = 1;

async function main() {
	const uri = "mongodb+srv://carsoe2:krVXU2PP5HgveqOX@cluster0.nlabenv.mongodb.net/?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

	try {
		await client.connect();
		await addData(client, "Jan");
        await addData(client, "Feb");
        await addData(client, "Mar");
        await addData(client, "Apr");
        await addData(client, "May");
        await addData(client, "Jun");
        await addData(client, "Jul");
        await addData(client, "Aug");
        await addData(client, "Sep");
        await addData(client, "Oct");
        await addData(client, "Nov");
        await addData(client, "Dec");
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

//source: https://www.geeksforgeeks.org/how-to-convert-csv-to-json-file-having-comma-separated-values-in-node-js/
async function addData(client, file) {
	await client.connect();
    csv = fs.readFileSync("./client/src/component/resources/WindData/" + file + ".csv");
    //console.log(file);
    const array = csv.toString().split("\r");
    let result = [];
    for (let i = 0; i < array.length - 1; i++) {
        let obj = array[i].replace("\n","").split(",");
        result.push(obj)
    }
    //console.log(result);
	const res = await client.db("VAST").collection("windVel").insertOne({"_id":month,"data":{result}});
    month++;
    console.log(res.insertedId);
}