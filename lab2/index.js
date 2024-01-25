var first = "https://api.openweathermap.org/data/2.5/weather?q=";
var firstLatLong = "https://api.openweathermap.org/data/2.5/weather?lat="
var last = "&appid=3cd453a07d6646f32a0932b7d3ead960&units=imperial";
var city = "";
var state = "";
var country = "";
var zip = "";
var url = first;
var req;
var lat;
var long;

$(document).ready(function () {
    getLocation();

    /*
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            getLocationData(jsonObj);
        } else {
            document.getElementById("locationBody").innerHTML = "<h1>Your location does not exist. Please try again!</h1>";
        }
    };
    //url gets ip address of client
    req.open("GET", "https://api.ipgeolocation.io/ipgeo?apiKey=c4d296f6d74040178da2b7fb66ac6161", true);
    req.send();
    */
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLatLong);
    } else {
        document.getElementById("locationBody").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function setLatLong(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    if (lat && long) {
        getLatLongWeather();
    } else {
        document.getElementById("locationBody").innerHTML = "<h1>Your location does not exist. Please try again!</h1>";
    }
}

function getLatLongWeather() {
    url = firstLatLong + lat + "&lon=" + long + last;
    //get data from custom url
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            console.log(jsonObj);
            displayData(jsonObj, "locationBody");
        } else {
            document.getElementById("locationBody").innerHTML = "<h1>Invalid location information entered. Please try again!</h1>";
        }
    };
    req.open("GET", url, true);
    req.send();
    console.log(url);
}

function getLocationData(data) {
    if (data) {
        url = first + data.city + "," + data.country_name + last;
        //get data from custom url
        req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObj = JSON.parse(this.responseText);
                displayData(jsonObj, "locationBody");
            } else {
                document.getElementById("locationBody").innerHTML = "<h1>Invalid location information entered. Please try again!</h1>";
            }
        };
        req.open("GET", url, true);
        req.send();
        console.log(url);
    }
}

function displayData(weatherData, idName) {
    if (weatherData) {
        var temp = weatherData.main.temp;
        var forecast = weatherData.weather[0].description;
        var low = weatherData.main.temp_min;
        var high = weatherData.main.temp_max;
        var humidity = weatherData.main.humidity;
        var windSpeed = weatherData.wind.speed;

        document.getElementById(idName).innerHTML =
            "<h3>Forecast: " + forecast + "</h3>" +
            "<h3>Current Temperature: " + temp + "°F</h3>" +
            "<h3>Low: " + low + "°F</h3>" +
            "<h3>High: " + high + "°F</h3>" +
            "<h3>Humidity: " + humidity + "%</h3>" +
            "<h3>Wind Speed: " + windSpeed + " mph</h3>";
        clearLocationForm();
    }
}

function validateLocationForm() {
    city = document.forms.locationForm.city.value;
    state = document.forms.locationForm.state.value;
    country = document.forms.locationForm.country.value;
    zip = document.forms.locationForm.zcode.value;

    //form url
    url = first;
    if (city == "" && zip == "") {
        alert("City or Zip Code must be filled out");
        return false;
    }
    if (country == "") {
        alert("Country must be filled out");
        return false;
    }

    if (city != "") {
        url += city;
    }
    if (state != "") {
        if (city != "") {
            url += "," + state;
        } else {
            url += state;
        }
    }
    if (city == "") {
        url += country;
    } else {
        url += "," + country;
    }
    if (zip != "") {
        url += "," + zip;
    }
    url += last;

    //get data from custom url
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            displayData(jsonObj, "displayBody");
        } else {
            document.getElementById("displayBody").innerHTML = "<h1>Invalid location information entered. Please try again!</h1>";
        }
    };
    req.open("GET", url, true);
    req.send();
    console.log(url);
}

function clearLocationForm() {
    city = document.forms.locationForm.city.value = "";
    state = document.forms.locationForm.state.value = "";
    country = document.forms.locationForm.country.value = "";
    zip = document.forms.locationForm.zcode.value = "";
}