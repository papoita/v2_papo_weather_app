



function search(event) {
  event.preventDefault();
  let apiKey = "c6410b310b8d22b3e3b3aa500da76687";
  let city = "Paris";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}