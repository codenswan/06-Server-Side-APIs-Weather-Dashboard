# 06-Server-Side-APIs-Weather-Dashboard

This weather dashboard utilises data provided by the open weather api (https://openweathermap.org/). The apis were used in this assignment:
  - Current weather data https://openweathermap.org/current
  - Ultraviolet Index https://openweathermap.org/api/uvi
  - 5 day weather forecast https://openweathermap.org/forecast5
  
Below is a screenshot of the deployed app.

![](Assets/Screen%20Shot%202020-06-30%20at%202.10.47%20pm.png)

# Application Purpose
This app helps a user plan a trip or an outing by providing current weather data for that day. The app also provides a 5 day forecast from the day of the search, showing weather data from 12pm for each of the 5 days. A user can search on multiple cities or towns that might be included in their trip and those searches are saved and can be reviewed later. The user can return to the weather dashboard and review forecast information for each of their selected cities.
  
# Application Features
This application uses bulma without any independent css styling. The html that displays the weather data is all rendered through javascript. I've used both vanilla js and jquery in the application. The reason for mixing the two was for practise purposes. 

When the user searches for a city the weather for that current day as well as a 5 day forecast is displayed. All searched cities are added to a search list displayed on screen as well as being added to localstorage for future use. When a previous city search is selected from the list new weather data is retrieved and displayed for that particular city. When the page is refreshed the last searched for city will be displayed upon reload.

# Future Changes
There are a couple of things I would like to change and/or update in future versions of this app:

- currently when a city is searched for more than once the city is listed in saved searches which causes a redundant listing. A small function needs to be added to determine if a city has already been searched for and if it has to not repeat the search.

- a button switching between celcius and fahrenheit would be a great feature to add. I'd have to either use an completely new ajax function using a query url with imperial measurment in it, or run conversion calcuations within the javascript.

- I think another important feature to include would be an extra field that informs the user which country the city is in. For e.g. when searching for "Melbourne" there information displayed to determine if Melbourne is in Australia or the USA.

- the UV index categories given by the Bureau of Meteorology Australia has 5 categories. To reflect this I would need to include another 2 if statements as well as additional colour coding.

# Link To Application
https://codenswan.github.io/06-Server-Side-APIs-Weather-Dashboard/
