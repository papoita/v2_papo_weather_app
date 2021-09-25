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
  //let year = date.getFullYear();
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

//to celcius
function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
//for weather conditions
function showTemp(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#conditions").innerHTML = response.data.weather[0].description;

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
  event.preventDefault();
  // let cityInput = document.querySelector("#city-input")
  // let city = cityInput.value
  //the two lines above can be replaced by the line below
  let city = document.querySelector("#city-input").value;
  search(city);

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//let fahrenheitLink = document.querySelector("#fahreheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celciusLink = document.querySelector("#celcius-link");
//celciusLink.addEventListener("click", convertToCelcius);

search("Ottawa");