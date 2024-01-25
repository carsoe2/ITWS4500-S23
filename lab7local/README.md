Sources:
https://blog.logrocket.com/getting-started-d3-js-react/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
https://www.tutorialsteacher.com/d3js/create-pie-chart-using-d3js#:~:text=pie()-,The%20d3.,the%20wedges%20in%20the%20SVG.
https://ihsavru.medium.com/react-d3-implementing-a-pie-chart-dc7bf13ff418
https://stackoverflow.com/questions/50741594/how-to-combine-two-arrays-into-an-array-of-objects-in-javascript
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

Notes:
There are two visualization components: the BarChart and PieChart components (both located in BarChart.js). Both plot the frequency a birthday appears in the data set. With the different dates and the fact that some databases list a city as a database, I filtered the data to only display birthdays where an overlap existed. The PieChart shows all the entries with overlap while the BarChart represents a condensed version where there were more than two overlaps. The data here is represented as an array of the values of the overlap.

The BarChart includes a text label which displays the number of overlapping birthdays on each bar element. On the PieChart, the number of overlaps is represented by the size of the arc. Something cool I found was using an interpolated color sequence. I used the interpolated cool color sequence which features various shades of green and blue that create a spectrum effect as the arc elements are added to the overall graph. I did not think including individual labels would have been helpful here with the number of entries. The data here is represented by a map of {labels, values} just in case I ended up choosing to include labels. Using a map was slightly more challenging as the syntax for initializing the pie chart was slightly confusing for me, but it was interesting to start to see how to use the different data formats.

Something interesting about this is that refreshing the page results in a GET error where the graphs no longer display. I am not sure why this is the case, but clicking the back arrow to return to the home page and then clicking back into the visualization once again shows the graphs.