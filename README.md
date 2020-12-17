# weatherAPI


![Weather site](./02-Homework/Assets/Untitled.png)
[Link to Website](https://nvrtis.github.io/weatherAPI/)

## Description

In this assignment the goal was to see the weather outlook for multiple cities. I want to be presented after i have searched with present and future condition (5 days ahead) of that city. City name, date, icon representation of weather condition, humidity, the wind speed, and the UV index needs to be present.
I will also have to present with color if the conditions for the city is favorable, moderate, or severe.

The city i have searched for should also be stored in local storage, and make a append it with the search button, so that i can press it next time i join the site

### Html

Html is using Bootstrap for simple grid layout. 

### CSS

Padding and margins are most important to make everything nice and presentable

### Javascript



![script](./02-Homework/Assets/script1.png)

function find is there to take any cities the user searches for or when clicking the last search button, it will make sure it will be no duplicates

function displayWeather takes users input, stores the variable and sends it to presentWeather function

function presentWeather ajax call to get temp, humidity, wind speed and UV index function and forevast funtion. Also has a if statment if the code = 200 then it means that the information is available and we can get the item. of city array is empty, we create an empty array before we pushes the city into it and call addToList function. Else if the city array is not empty we will just push into it before calling the same function

![script](./02-Homework/Assets/script2.png)

function UVIndex still needs some work with the color shifting with if statments. But otherwise takes the information from the previous Ajax call and call for a new one for the UV index info. After we have recieved the respons it will post it and set a color

![script](./02-Homework/Assets/script3.png)

function forecast is another Ajax call that uses the forecast api. I still need some work here, the days and month will not work around a new month. Still not sure how i will have to code that. But otherwise it takes the information from the forecast and post is 5 times in a loop with all the information.

function addToList prepends everything from the cities that will be pushed into an array and posts it and adds a uppercase for it. May add a maximum to the list later on.

![script](./02-Homework/Assets/script4.png)

function getPastSearch uses the users mouse and compares it to the list and calls the presentweather function.

function loadlastCity loads the last city the users searched for in the beginning og the page

function clearHistory deletes the city array, empty the local storage and search list