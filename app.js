
/*

let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);
*/
//to celcius



// The time stamp given in the current weather api from which we get the time stamp is given in miliseconds since 1970 so what we have to do is :

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let dates = date.getDate();
  return `${day} ${hours}:${minutes} <br/> ${dates} ${month}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return day;
}


function displayForecast(response) {
  let forecast = response.data.daily;
  //let forecast = response.data.hourly;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>

      <img
        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">${forecastDay.temp.max} °</span>
        <span class="weather-forecast-temp-min">${forecastDay.temp.min} °</span>
    </div>
  </div> `;
  });


  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "888e4fcf51eb407327068f47d5808891";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

//for weather conditions
function showTemp(response) {

  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#conditions").innerHTML = response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);

}


function search(city) {
  let apiKey = "888e4fcf51eb407327068f47d5808891";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  //to check if axios is working you can console.log it
  console.log(axios);
  axios.get(apiUrl).then(showTemp);
}


//search form must include axios search

function handleSubmit(event) {
  //debugger;
  event.preventDefault();

  let city = document.querySelector("#city-input");
  search(city.value);

}
function showPosition(position) {

  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  console.log(lat);
  console.log(lon);
  //challenge 2 - show current weather
  //let apiKey = "apiKey";
  //replace apiKey with secret personal key before loading
  //https://home.openweathermap.org/api_keys
  let units = "metric";
  let apiKey = "888e4fcf51eb407327068f47d5808891";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}


function showLocation(event) {
  event.preventDefault();
  console.log("current location function!");
  navigator.geolocation.getCurrentPosition(showPosition);
}



//let fahrenheitLink = document.querySelector("#fahreheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celciusLink = document.querySelector("#celcius-link");
//celciusLink.addEventListener("click", convertToCelcius);
let button = document.querySelector("#current-location-button");
button.addEventListener("click", showLocation);



function showFahrenheitTemperature(event) {
  event.preventDefault();
  //alert("clicked");
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


search("Ottawa");
//displayForecast();