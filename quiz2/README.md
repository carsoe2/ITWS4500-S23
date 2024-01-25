Note: if there is a swapspace error when running, my github has the local verison under the quiz2Local folder

APIs used:
https://api-ninjas.com/api/celebrity
https://api-ninjas.com/api/historicalfigures
https://www.superheroapi.com/
https://rapidapi.com/AbhishekBhatt072003/api/actor-movie-api1/

Notes:
There are two visualization components: the BarChart and NameChart components (both located in BarChart.js). The first plots the frequency of birthdays and the second the frequencies of the names in the database.The BarCharts represent a condensed version where there were more than two overlaps. The data here is represented as an array of the values of the overlap. This was done by storing the data in the map with either the burthday or the name as the key.

The BarCharts include a text label which displays the number of overlapping birthdays on each bar element.

Something interesting about this is that refreshing the page results in a GET error where the graphs no longer display. I am not sure why this is the case, but clicking the back arrow to return to the home page and then clicking back into the visualization once again shows the graphs.

Approximately 450 entries have been added to the database. The 4 databases used were the historical figures API from lab5, celebrity API, superhero API, and actor API. Each of these APIs are slightly different in the sense of the information they return, but all of the information can be manipulated to fit the title or born features. For example: superhero API lists the name as the secret identity, the title as the superhero name, and the born as the birth city. Another example: the actor api returns the name of the actor, the title of the movie, and the date the movie was released for born (does this count for creativity?). The loadDatabases javascript files were used to mass load these entries pulling names from a json file (while not used in the final code, could this be considered a part of the initial automation process?). Each file reformats the data of its respective API and inserts it into my database.

The Create Person tab now has a new form which is a dropdown menu with the options to add a new person without searching through the API (first option: No API). The other four options take the name given in the form and search the API selected to find the person. After the search button is clicked, the page automatically redirects to the home page. Scrolling to the bottom of the page will show the entry if the new entry was not a duplicate (checks by _id) and was found in the API. Otherwise, the new entry will show. The code used here is very similar to the code used in the loadDatabases folder. An issue that I noticed with the superhero and actor API is that even though an entry is added to the database, when the page redirects to home, it does not always show. If the page is refreshed, the entry will display at the bottom. Additionally, when entering a new person into the historicalFigures API (first API), the page may not automatically redirect (possibly due to the higher latency of the API?), but when the back arrow is clicked to return to home, the database will be updated if the entry was found and not a duplicate.

