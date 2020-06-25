let city = $(".input").val();

//add searches to save list
function savedSearches() {
    let a = $("<a>").addClass("panel-block").val(city);
    let span = $("<span>").addClass("panel-icon")
    let i = $("<i>").addClass("fas fa-city")
    
    $("#saved-searches").append(a, span, i);
}

$(".panel-block").on("click", function(){
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
    console.log($(".input").val());

    const city = $(".input").val();
    const apiKey = "&appid=37c46c36e443323326f2545ed2229ed9";
    const queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $("#searchTerm").val("");  
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      console.log(response.name);
      console.log(response.weather[0].icon);

      let tempF = (response.main.temp - 273.15) * 1.8 + 32;
      console.log(Math.floor(tempF));

      console.log(response.main.humidity);

      console.log(response.wind.speed);
    });
    
    // savedSearches()
});