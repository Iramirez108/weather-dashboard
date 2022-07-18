//CRITERIA
//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city

var apiKey = "1d0652383071067233fde937e77bd6e5";
var today = moment().format('L');
var searchHistoryList = [];

function currentCondition(city){
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(cityWeatherResponse){
        console.log(cityWeatherResponse);
        $("#weatherContent").css("display","block");
        $("#cityDetail").empty();
        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = 'https://openweathermap.org/img/w/${iconCode}.png';

        var currentCity = $('<h2 id="currentCity">${cityWeatherResponse.name} ${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}"/></h2> <p>Temperature: ${cityWeatherResponse.main.temp} °F</p><p>Humidity: ${cityWeatherResponse.main.humidity}\%</p> <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>');

        $("#cityDetail").append(currentCity);

        futureCondition(lat,lon);
    });
};

//got code from https://www.openuv.io/uvindex
function getUVIndex() {
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var alt = $('#alt').val();
    var ozone = $('#ozone').val();
    var dt = $('#dt').val();
   
    $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(request) {
        request.setRequestHeader('x-access-token', '1d60f2c9bd5146e2b08fb7ba82574d66');
      },
      url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng + '&alt=' + alt + '&ozone=' + ozone + '&dt=' + dt,
      success: function(response) {
        //handle successful response
      },
      error: function(response) {
        // handle error response
      }
    });
   }