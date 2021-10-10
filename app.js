
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
  let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


search("Ottawa");