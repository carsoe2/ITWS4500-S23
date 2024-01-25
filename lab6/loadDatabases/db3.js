var XMLHttpRequest = require('xhr2');
var people = require("./db3.json");

var req2;

const { MongoClient, ServerApiVersion } = require('mongodb');
async function main() {
    const uri = "mongodb+srv://carsoe2:krVXU2PP5HgveqOX@cluster0.nlabenv.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
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
    var id = jsonObj._id;
    var count = await client.db("famousPeople").collection("lab6").count({ _id: id });
    if (count == 0) {
        const result = await client.db("famousPeople").collection("lab6").insertOne((jsonObj));
        console.log(result.insertedId);
    } else {
        jsonObj._id = (parseInt(jsonObj._id) + 1).toString();
        await createEntry(client, jsonObj);
    }
}

async function add100Data(client) {
    var names = people.names;
    await client.connect();
    for (const name of names) {
        try {
            var url = 'https://actor-movie-api1.p.rapidapi.com/getid/' + encodeURI(name) + '?apiKey=62ffac58c57333a136053150eaa1b587';
            req2 = new XMLHttpRequest();
            req2.onreadystatechange = async function () {
                if (this.readyState === this.DONE) {
                    await client.connect();
                    const res = JSON.parse(this.responseText);
                    //var title = res[0]["original_title"];
                    //var born = res[0]["release_date"];
                    try {
                        for (r of res) {
                            title = r["original_title"];
                            born = r["release_date"];
                            if (title) {
                                const count = await client.db("famousPeople").collection("lab6").count() + 1;
                                const jsonObj = JSON.parse("{\"_id\":\"" + count + "\",\n\"results\":[{\"name\":\"" + name
                                    + "\",\n\"title\":\"" + title + "\",\n\"info\":{\"born\":\"" + born + "\"}}]\n}");
                                await createEntry(client, jsonObj);
                            }
                        }
                    } catch (e) { }
                }
            };

            req2.open("GET", url, true);
            req2.setRequestHeader("X-RapidAPI-Key", "1444ab27c7msh1395f90543dd378p16ed63jsn1cfefb4aac86");
            req2.setRequestHeader("X-RapidAPI-Host", "actor-movie-api1.p.rapidapi.com");
            req2.send();
        } catch (e) { console.log(e) }
    }
}