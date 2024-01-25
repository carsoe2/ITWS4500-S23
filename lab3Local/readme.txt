Sources:
https://www.geeksforgeeks.org/how-to-add-data-in-json-file-using-node-js/
https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
https://api-ninjas.com/api/historicalfigures
https://www.youtube.com/watch?v=00NNuZHF56A&ab_channel=procademy
https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
https://www.youtube.com/watch?v=Pb_0b7Y5NEk&ab_channel=KindsonTheTechPro
https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit

Info:
The API used is a people of history API which returns information about a person from history given their name.
The primary get requests formats a name given from the index.html form and calls the internal API with that name.
The internal API calls the external API with that value and returns a JSON object for parsing.

Remaining methods (Get #2, Post, Delete, and Put) use names.json.
Since we do not have a database, each modifies or displays information in this json file.
Put does nothing at the moment but you get a nice message in the console when you do a put request.

Status Codes used:
200 - success
500 - something went wrong on my end
404 - used for debugging and calling my internal API incorrectly

Note:
For some reason, the Get section can be slow (not sure why). Clicking multiple times makes the request
go through faster (twice usually works). Not sure why but that's how it behaves for me.