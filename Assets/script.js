//add searches to save list
function savedSearches() {
  const city = $(".input").val();
    let a = $("<a>").addClass("panel-block");
    let span = $("<span>").addClass("panel-icon")
    let i = $("<i>").addClass("fas fa-city")
    let p = $("<p>").text(city);
    span.append(i);
    a.append(span);
    a.append(p)
    $("#saved-searches").append(a);
}

$(document).on("click", ".panel-block", function(){
    $(".panel-block").removeClass("is-active");
    $(this).addClass("is-active");
})

// this function allows submit on enter key press 
$("#city-search").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#search-btn").click();
  }
});

$("#search-btn").on("click", function () {
  document.querySelector("#weather-data").removeAttribute("hidden");
  savedSearches()
  currentWeather();
  forecastWeather()
  $("#city-search").val("");
});

//this function retrieves api data and creates elements to populate the weather-data card with api data.
function currentWeather() {
  const city = $(".input").val();
  const apiKey = "&appid=37c46c36e443323326f2545ed2229ed9";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    ``
    //Sets the city name for the weather data. Also sets the date with moment.js
    document.querySelector("#current-city").textContent = response.name;
    document.querySelector("#current-date").textContent = moment().format(
      "MMMM Do YYYY"
    );
    //Sets the weather icon
    document.querySelector("#current-weather-pic").src =
      "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    
    //sets the alt text to match the icon
    document.querySelector("#current-weather-pic").alt =
      response.weather[0].description;

    //Converts temp to fahrenheit and displays weather data
    let tempF = (response.main.temp - 273.15) * 1.8 + 32;
    document.querySelector("#current-temp").textContent =
      "Temperature: " + Math.floor(tempF) + "°F";
    document.querySelector("#current-humidity").textContent =
      "Himidity: " + response.main.humidity + "%";
    document.querySelector("#current-wind").textContent =
      "Wind speed: " + response.wind.speed + "MPH";
  });
}

//this function retrieves api forecast data and creates elements to populate the 5 day forecast cards with api data.
function forecastWeather() {
  const city = $(".input").val();
  const apiKey = "&appid=37c46c36e443323326f2545ed2229ed9";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
};