# 06-Server-Side-APIs-Weather-Dashboard

This weather dashboard utilises data provided by the open weather api (https://openweathermap.org/). The apis were used in this assignment:
  - Current weather data https://openweathermap.org/current
  - Ultraviolet Index https://openweathermap.org/api/uvi
  - 5 day weather forecast https://openweathermap.org/forecast5
  
Below is a screenshot of the deployed app.
!(06-Server-Side-APIs-Weather-Dashboard/Assets/Screen%20Shot%202020-06-30%20at%202.10.47%20pm.png)
  
# Application Features
After completing your first city search current and future weather data is displayed on the screen, and the city searched is added to your recent cities on the left hand side of the page. The last searched for city information is stored in localStorage, allowing you to refresh the page and still have the previously searched cities displayed as well as the previous city weather information still displayed on the page. Additionally, if you search for a city multiple times it will only be added to the search history once.

# Future Changes
There are a couple of things I would like to change and/or update in future versions of this app:

Calling up local weather upon document's first load: because the window information tied to this is in lon/lat rather than city name information, I would have to write a completely new way of performing city search on the page's first load. With the time crunch I decided that this would have to be completed at a later date.

Creating layout elements dynamically, rather than having them available to be appended to on first search: because the local weather does not appear on first load, the landing page looks sloppy until you've searched for your first city.

# Link To Application
https://codenswan.github.io/06-Server-Side-APIs-Weather-Dashboard/
