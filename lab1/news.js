var first = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
var last = "&api-key=Aymn99P5JscGaE6vS1ZYP4bjRLaqAYug";
var query = "";
var url = first;
var timer;
//holds article data
var techSlides = [];
var politicsSlides = [];
var sportsSlides = [];
var businessSlides = [];
var entertainmentSlides = [];
//variables for slide index
var index = [0, 0, 0, 0, 0];

$(document).ready(function () {
    getNews("tech");
    getNews("politics");
    getNews("sports");
    getNews("business");
    getNews("entertainment");
});

$("#techBack").click(function () {
    back(0);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#techNext").click(function () {
    next(0);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#politicsBack").click(function () {
    back(1);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#politicsNext").click(function () {
    next(1);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#sportsBack").click(function () {
    back(2);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#sportsNext").click(function () {
    next(2);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#businessBack").click(function () {
    back(3);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#businessNext").click(function () {
    next(3);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#entertainmentBack").click(function () {
    back(4);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

$("#entertainmentNext").click(function () {
    next(4);
    clearInterval(timer);
    timer = setInterval(switchArticles, 5000);
});

function startTimer() {
    //switch articles every 5 seconds
    timer = setInterval(switchArticles, 5000);
}

function switchArticles() {
    next(0);
    back(1);
    next(2);
    back(3);
    next(4);
}

function back(i) {
    index[i]--;
    if (index[i] < 0) {
        index[i] += 10;
    }
    if (i === 0) {
        updateData(techSlides, "tech", index[i]);
    } else if (i == 1) {
        updateData(politicsSlides, "politics", index[i]);
    } else if (i == 2) {
        updateData(sportsSlides, "sports", index[i]);
    } else if (i == 3) {
        updateData(businessSlides, "business", index[i]);
    } else if (i == 4) {
        updateData(entertainmentSlides, "entertainment", index[i]);
    }
}

function next(i) {
    index[i]++;
    if (index[i] >= 10) {
        index[i] %= 10;
    }
    if (i === 0) {
        updateData(techSlides, "tech", index[i]);
    } else if (i == 1) {
        updateData(politicsSlides, "politics", index[i]);
    } else if (i == 2) {
        updateData(sportsSlides, "sports", index[i]);
    } else if (i == 3) {
        updateData(businessSlides, "business", index[i]);
    } else if (i == 4) {
        updateData(entertainmentSlides, "entertainment", index[i]);
    }
}

function getNews(category) {
    url = first + category + last;
    //get data from custom url
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            displayData(jsonObj, category);
        } else {
            document.getElementById(category + "Title").innerHTML = "<h1>Error</h1>";
        }
    };
    req.open("GET", url, true);
    req.send();
    console.log(url);
}

function displayData(data, idName) {
    if (data) {
        var i = 0;
        for (; i < 10; i++) {
            var slide = [];
            //title
            slide.push(data.response.docs[i].abstract);
            //link
            slide.push(data.response.docs[i].web_url);
            //description
            slide.push(data.response.docs[i].snippet);
            //image
            var url;
            if (data.response.docs[i].multimedia[0] != undefined) {
                url = data.response.docs[i].multimedia[0].url;
                slide.push("https://www.nytimes.com/" + url);
            } else {
                url = "https://static01.nyt.com/vi-assets/images/share/1200x1200_t.png";
                slide.push(url);
            }

            //add new article entry
            if (idName == "tech") {
                techSlides.push(slide);
            } else if (idName == "politics") {
                politicsSlides.push(slide);
            } else if (idName == "sports") {
                sportsSlides.push(slide);
            } else if (idName == "business") {
                businessSlides.push(slide);
            } else if (idName == "entertainment") {
                entertainmentSlides.push(slide);
            }
        }
        var temp;
        if (idName == "tech") {
            temp = techSlides;
        } else if (idName == "politics") {
            temp = politicsSlides;
        } else if (idName == "sports") {
            temp = sportsSlides;
        } else if (idName == "business") {
            temp = businessSlides;
        } else if (idName == "entertainment") {
            temp = entertainmentSlides;
        }

        if (temp) {
            updateData(temp, idName, 0);
        }
    }
}

function updateData(temp, idName, i) {
    document.getElementById(idName + "Pic").src = temp[i][3];
    document.getElementById(idName + "Pic").style.height = "15vh";
    document.getElementById(idName + "Pic").style.maxHeight = "100px";
    document.getElementById(idName + "Pic").style.width = "15vw";
    document.getElementById(idName + "Title").innerHTML = temp[i][0];
    document.getElementById(idName + "Desc").innerHTML = temp[i][2];
    document.getElementById(idName + "Link").href = temp[i][1];
    document.getElementById(idName + "Link2").href = temp[i][1];
}
