//add searched cities to save list
function citySearchList() {
  const city = $(".input").val();
  const a = $("<a>").addClass("panel-block");
  const span = $("<span>").addClass("panel-icon");
  const i = $("<i>").addClass("fas fa-city");
  const p = $(`<p onclick="currentWeather('${city}')">`).text(city);
  span.append(i);
  a.append(span);
  a.append(p);
  $("#saved-searches").append(a);
}

//this click event makes active the selected city from the save list and repopulates the weather data card with the correct data
$(document).on("click", "#saved-searches", function () {
  $(".panel-block").removeClass("is-active");
  $(this).addClass("is-active");
  let city = $(this).text();
  currentWeather(city);
});

// this function allows submit on enter key press
$("#city-search").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#search-btn").click();
  }
});

$("#search-btn").on("click", function () {
  $("#weather-data").removeAttr("hidden");
  $(".container").removeAttr("hidden");
  const city = $(".input").val();
  const savedCities = []
  savedCities.push(city)
  localStorage.setItem("savedCities", JSON.stringify(savedCities))
  console.log(localStorage)
  currentWeather(city);
  citySearchList();
  forecastWeather(city);

  $("#city-search").val("");
});

//this function retrieves api data and creates elements to populate the weather-data card with api data.
function currentWeather(city) {
  if (!city) return;

  const apiKey = "&appid=37c46c36e443323326f2545ed2229ed9";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then((response) => {
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
      document.querySelector(
        "#current-temp"
      ).textContent = `Temperature: ${Math.floor(tempF)}F`;
      document.querySelector(
        "#current-humidity"
      ).textContent = `Humidity: ${response.main.humidity}%`;
      document.querySelector(
        "#current-wind"
      ).textContent = `Wind speed: ${response.wind.speed}MPH`;
      uvIndex(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

//the lat and lon info from the ajax response in the previous function is pass into uvIndex to get the correct city's data
function uvIndex(response) {
  const apiKey = "&appid=37c46c36e443323326f2545ed2229ed9";
  const queryURL = `http://api.openweathermap.org/data/2.5/uvi?${apiKey}&lat=${response.coord.lat}&lon=${response.coord.lon}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    //gets the uv index for searched city and adds to the span element
    document.querySelector(
      "#current-uv"
    ).textContent = `UV Index: ${response.value}`;

    //low 1-2, moderate 3-5, or high 6-7, 8-10 very high, 11+ extreme according to http://www.bom.gov.au/uv
    let uv = document.querySelector("#current-uv");

    if (response.value <= 2.0) {
      uv.removeAttribute("class");
      uv.classList.add("has-text-white", "has-background-success-dark");
      return;
    }

    if (response.value <= 5.0 && response.value > 2.0) {
      uv.removeAttribute("class");
      uv.classList.add("has-text-white", "has-background-warning-dark");
      return;
    }

    if (response.value > 5.0) {
      uv.removeAttribute("class");
      uv.classList.add("has-text-white", "has-background-danger-dark");
      return;
    }
  });
}

//this function retrieves api forecast data and creates elements to populate the 5 day forecast cards with api data.
function forecastWeather(city) {
  
  //displays the weather forecast cards
  $("#weather-forecast").empty();
  const apiKey = "&appid=37c46c36e443323326f2545ed2229ed9";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    let forecastResult = response.list;

    for (let i = 0; i < forecastResult.length; i++) {
      console.log(forecastResult);
      if (forecastResult[i].dt_txt.indexOf("12:00:00") !== -1) {
        // convert temp to fahrenheit
        let temp = (forecastResult[i].main.temp - 273.15) * 1.8 + 32;
        let tempF = Math.floor(temp);

        const dayCol = $("<div>").addClass(
          "column mt-6 mx-3 has-background-info"
        );
        const date = $("<p>").text(
          new Date(forecastResult[i].dt_txt).toLocaleDateString()
        );

        const icon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            forecastResult[i].weather[0].icon +
            ".png"
        );

        const temperature = $("<p>").text(`Temperature: ${Math.floor(tempF)}F`);
        const humidity = $("<p>").text(
          `Humidity: ${forecastResult[i].main.humidity}%`
        );

        dayCol.append(date, icon, temperature, humidity);
        $("#weather-forecast").append(dayCol);
      }
    }
  });
}

// function init() {
//   if (!localStorage) {
//     return;
//   } else {
//     localStorage.getItem("savedCities");
//     console.log(savedCities)
//   }
// }

// window.onload = init()
