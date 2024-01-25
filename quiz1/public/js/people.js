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
$("#getCollegeForm").submit(function (e) {
    e.preventDefault();
});

function getRPI() {
    college = "rensselaer polytechnic institute";
    college = college.replace(" ", "%20");
    //form url
    url = first + "/v2/" + college;
    req.onreadystatechange = function () {
        if (this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            console.log(url);
            displayData(jsonObj, "collegeDisplayBody");
        } else {
            document.getElementById("collegeDisplayBody").innerHTML = "<h3>Something went wrong!</h3>";
            console.log("error");
        }
    };

    //get data from custom url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
}

//returns the information from the external API call through server.js
function getCollege() {
    college = document.forms.getCollegeForm.college.value.trim();
    college = college.replace(" ", "%20");
    //form url
    /*
    url = first + "/v2/" + college;
    if (college == "") {
        alert("College must be filled out");
        return false;
    }
    console.log(url);
    req.onreadystatechange = function () {
        if (this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            console.log(url);
            if(jsonObj != []) {
                displayCollegeData(jsonObj, "collegeDisplayBody");
            } else {
                getRPI();
            }
        } else {
            document.getElementById("collegeDisplayBody").innerHTML = "<h3>Something went wrong!</h3>";
            console.log("error");
        }
    };

    //get data from custom url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    */

    
    var url = 'http://universities.hipolabs.com/search?name=' + college + '&country=United%20States';
    window.open(url);
	req.onreadystatechange = function () {
        if (this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            console.log(url);
            displayData(jsonObj, "collegeDisplayBody");
        } else {
            console.log("error");
        }
    };

    //get data from custom url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    
}

//returns the information from the external API call through server.js
function getName() {
    person = document.forms.getForm.person.value.trim();
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

function displayCollegeData(jsonObj, htmlID) {
    var i = 0;
    var str = "<b>Results:</b><br/>";
    for (i; i < jsonObj.length; i++) {
        //str += "Name: " + jsonObj[i].name;
        //str += "<br/>Title: " + jsonObj[i].title;
        //str += "<br/>Born: " + jsonObj[i].info.born + "<br/><br/>";
        //str += "<br/>Born: " + jsonObj[i].info.born;
    }
    console.log(jsonObj);
    document.getElementById(htmlID).innerHTML = str;
}