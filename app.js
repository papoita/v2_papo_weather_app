let apiKey = "apiKey";

//date
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = date.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()]; //0 and 6

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentTime.getMonth()];
  let dates = currentTime.getDate();

  console.log(hours, minutes);
  return `${hours}:${minutes} <br/> ${day} <br> ${month}, ${dates}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

//Works for button click current location
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let tempHeading = document.querySelector("#temp-input");
  tempHeading.innerHTML = `${temperature}`;
  let city = response.data.name;
  console.log(city);
  let cityHeading = document.querySelector("#city");
  cityHeading.innerHTML = `${city.toUpperCase()}`;
  console.log(response);
  let humidity = response.data.main.humidity;
  console.log(humidity);
  let conditions = response.data.weather[0].description;
  console.log(conditions);
  let feels = response.data.main.feels_like;
  console.log(feels);
  let humidityHeading = document.querySelector("#humidity");
  humidityHeading.innerHTML = `Humidity: ${humidity} %`;
  let conditionsHeading = document.querySelector("#conditions");
  conditionsHeading.innerHTML = `${conditions}`;
  let feelsHeading = document.querySelector("#feels");
  feelsHeading.innerHTML = `Feels like: ${feels} °C`;
}
//show position based on current location lat and lon
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

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showLocation(event) {
  event.preventDefault();
  console.log("wearehere-we made it!yuhu!");
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showLocation);

//Button search for a city

function cityInput(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input");
  console.log(newCity.value);
  let city = newCity.value;
  let searchedCity = document.querySelector("#city");
  searchedCity.innerHTML = `${newCity.value.toUpperCase()}`;
  console.log("ok we have city lets get weather");
  let units = "metric";
  //	let apiKey = "apiKey";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  console.log("ok step 2");
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityInput);
