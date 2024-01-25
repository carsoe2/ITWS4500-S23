Sources:
Translating blocks: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
Display inspiration: https://www.usnews.com/ (heavy deviation but the idea is there)
Color template: https://coolors.co/283d3b-197278-edddd4-c44536-772e25 (there was an attempt)
Fake News Logo design: https://express.adobe.com/sp/onboarding
Vertical text alignment: https://stackoverflow.com/questions/2939914/how-do-i-vertically-align-text-in-a-div
Inheriting other features: https://stackoverflow.com/questions/2460100/remove-the-complete-styling-of-an-html-button-submit
Max/min height/width: https://ishadeed.com/article/min-max-css/
Update data without refreshing: https://stackoverflow.com/questions/22577457/update-data-on-a-page-without-refreshing
Using setInterval: https://stackoverflow.com/questions/54314906/creating-a-fading-image-in-javascript-by-changing-opacity-over-a-period-of-time
Reset timer: https://stackoverflow.com/questions/8126466/how-do-i-reset-the-setinterval-timer

Group specification guide:
- 5 articles displayed at all times
- Use a news api to find articles
- Display category, title, description, image
- Potential references: FOX News or USA News
- Use of ‘fetch/AJAX’ function for API calls


Commentary:
I used the NYTimes API which gave the results of 10 articles in a given query. I decided to display 5 articles
from different news categroies (tech, politics, sports, business, entertainment). This way, articles are unlikely
to be duplicated in the current display of 5. Upon opening the website, the program makes 5 calls to the API for each
of the categories and stores the data in a JSON object. The program then searches through the elements in the articles
returned to store the title, description, image, and link. These are stored in a 10x4 matrix (10 articles, 4 data
points collected ) for fast/easy access when displaying the data. This way the inital 5 calls to the API are all that is needed
to show articles.

The default display is the first article returned in the search result. The category, title, description, and image
are shown in a table (5 tables for 5 categories). The program cycles to another article every 5 seconds by default.
If the user wants to view the articles faster, they can click on the "Back" and "Next" arrows. The display will update
and the timer will reset. This way if a user clicks "Next" 4 seconds after the previous change, they have an additional
5 seconds to interact with the article before the cycling continues. For any display, the user can click on a part of
the article data (title, description, image) and they will be directed to the source of the article.

Formatting took the longest for this lab, especially when working with updating the sizing for mobile phones. The text
on mobile is a little small, but using min/max height/width and vw and vh rather than % or px helped scale images and
tables appropriately. I used vertical/horizontal translation in the CSS to align the location of certain text elements.