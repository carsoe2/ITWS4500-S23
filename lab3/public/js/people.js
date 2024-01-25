//var first = "http://localhost:3000";
var first = "https://carsoe2.eastus.cloudapp.azure.com/node";
var fname = "";
var lname = "";
var person = "";
var id = "";
var req = new XMLHttpRequest();

$("#getForm").submit(function (e) {
    e.preventDefault();
});
$("#delForm").submit(function (e) {
    e.preventDefault();
});
$("#putForm").submit(function (e) {
    e.preventDefault();
});

//adds a name from the form to the json file
function postName() {
    fname = document.forms.postForm.fname.value;
    lname = document.forms.postForm.lname.value;
    var person = fname + " " + lname;
    //form url
    url = first + "/v1/addPerson/" + person + "/" + fname + "/" + lname;
    if (fname == "" || lname == "") {
        alert("Both First and Last name must be filled out");
        return false;
    }

    //get data from custom url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    console.log(url);

    //use secondary GET request to display all names in JSON
    getJSONNames("postDisplayBody");
}

//returns all names currently in json file
function getJSONNames(htmlID) {
    url = first + "/names";
    req.onreadystatechange = function () {
        if (this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            console.log(jsonObj.body);
            var i = 0;
            var str = "";
            for (i; i < jsonObj.body.length; i++) {
                var iStr = i+1;
                iStr = iStr.toString();
                str += "<b>Person " + iStr + ":</b><br/>"
                str += "First Name: " + jsonObj.body[i].fname;
                str += "<br/>Last Name: " + jsonObj.body[i].lname + "<br/>";
            }
            console.log(jsonObj);
            document.getElementById(htmlID).innerHTML = str;
        } else {
            document.getElementById(htmlID).innerHTML = "<h3>Invalid id information entered. Please try again!</h3>";
        }
    };

    //get data from custom url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    console.log(url);
}

//returns the information from the external API call through server.js
function getName() {
    person = document.forms.getForm.person.value;
    person = person.replace(" ", "%20");
    //form url
    url = first + "/v1/" + person;
    if (person == "") {
        alert("Name must be filled out");
        return false;
    }
    req.onreadystatechange = function () {
        if (this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            console.log(url);
            displayData(jsonObj, "getDisplayBody");
        } else {
            document.getElementById("getDisplayBody").innerHTML = "<h3>That person does not exist. Please try again!</h3>";
            console.log("error");
        }
    };

    //get data from custom url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
}

function delName() {
    id = document.forms.delForm.id.value;
    url = first + "/v1/deletePerson/" + id;
    if (id == "") {
        alert("ID must be filled out");
        return false;
    }

    //get data from custom url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    console.log(url);

    //use secondary GET request to display all names in JSON
    getJSONNames("delDisplayBody");
}

function putName() {
    url = first + "/v2/put";
    //get data from custom url

    req.onreadystatechange = function () {
        if (this.status == 200) {
            document.getElementById("putDisplayBody").innerHTML = "<h3>Trust me, put works!</h3>";
        } else {
            document.getElementById("putDisplayBody").innerHTML = "<h3>Put failed</h3>";
        }
    };

    req = new XMLHttpRequest();
    req.open("PUT", url, true);
    req.send();
    console.log(url);
}

function displayData(jsonObj, htmlID) {
    var i = 0;
    var str = "<b>Results:</b><br/>";
    for (i; i < jsonObj.length; i++) {
        str += "Name: " + jsonObj[i].name;
        str += "<br/>Title: " + jsonObj[i].title;
        str += "<br/>Born: " + jsonObj[i].info.born + "<br/><br/>";
        //str += "<br/>Born: " + jsonObj[i].info.born;
    }
    console.log(jsonObj);
    document.getElementById(htmlID).innerHTML = str;
}