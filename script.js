$(document).ready(() => {
  //Getting the current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function getWeather(position) {
    const ApiURL = "https://fcc-weather-api.glitch.me/api/current?";
    const lati = Math.floor(position.coords.latitude);
    const long = Math.floor(position.coords.longitude);

    const requestURL = ApiURL + "lat=" + lati + "&" + "lon=" + long;
    $.getJSON(requestURL, (weatherData) => {
      //display the city and country names
      $(".city").text(weatherData.name + ", " + weatherData.sys.country);
      //display a dicription of the weather
      $(".description").text(weatherData.weather[0].description);
      //display humidity
      $(".humidity").text("humidity: " + weatherData.main.humidity + "%");
      //get and display the weather icon
      $('.img').attr("src", weatherData.weather[0].icon);
      $('.temp').html(weatherData.main.temp + " &deg;");
      //temperature unit converter
      $('#unit').click(function() {
        if ($('#unit').text() == 'C') {
          $('.temp').html(((weatherData.main.temp) * 1.8 + 32).toFixed(2) + " &deg;");
          $('#unit').text("F");
        }
        else {
          $('.temp').html(weatherData.main.temp + " &deg;");
          $('#unit').text("C");
        }
      });
    });
  }
});
