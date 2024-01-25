APIs used: OpenWeatherMap and HTML Geolocation API

Notes about weather API:
One interesting thing I noticed about the search function is when the parameters are put in
as requested by OpenWeatherMap, the multiple parameters (city, state, country, zip) are not considered one group.
For example, when I try entering Tokyo, Russia (a city and country which do not exist together), the latitude and
longitude of the location is Tokyo, Japan. This suggests the API checks the first search parameter not blank and
returns the closest data related to that parameter.

On another hand, if the city is not "well known" the API will return no search results found. For example, when I
put in the city where I grew up in and erroneously entered "CA" (abbreviation for California) in the country line
rather than the state line and no proper country input, the API does not return a result. The program displays an
error message in the section instead of a weather report suggesting the user fix the error in their input.

The OpenWeatherMap API organizes data by returning the latitude and longitude of the location first, followed by a
summary of the weather, and ending with specific sections for more detailed weather (temp, wind, clouds, visibility,
etc). I like this organization of data because it is easy for the use to display simple data as I did with this lab.
A more advanced weather app may display more features using the later subdivisions and can find information easily
through this way. An example can be seen in troyLatLong.json

Notes about NASA Gene Lab API:
This is an example of an API that may not have great discoverability for all potential users. The request template is
the following:
https://genelab-data.ndc.nasa.gov/genelab/data/glds/files/{GLDS_STUDY_IDs}/?page={CURRENT_PAGE_NUMBER}&size={RESULTS_PER_PAGE}
The {GLDS_STUDY_IDs} seems to rely on the user to know the study ID of the topic they are looking for, meaning if the
user does not know the ID of the study, they may not be able to access the study data.

Once in the study, however, the presentation of the data is simple enough to understand. As seen in nasaGeneLab.json,
the file information is given as well as the ending to the url which will lead the user to the landing page of the study.

Notes about images.nasa.gov API:
Something that this API (and most likely many others) do is return a .json object regardless of there being an image
matching the keywords. When I searched for a very specific picture of the Eagle Nebula taken by the James Webb Telescope,
results came up that matched the key words. As seen in eagleNebula.json, there is a desciption section and image section
for each result returned. Each search result returns a link to a .json file containing additional images. While this may
be useful for easy access, I am not sure if I would use this design. If my group is planning on building an API for educators,
returning a .json file link within the .json file API call may not be helpful unless the code handles the second .json file
as well.

Sources:
Changing html in js file: https://www.youtube.com/watch?v=JxbhjQOlUvs&ab_channel=HarithaComputers%26Technology
Using HTML Geolocation API: https://www.w3schools.com/html/html5_geolocation.asp
