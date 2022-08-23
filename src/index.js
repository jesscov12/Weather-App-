let now = new Date();
let currentDate = document.querySelector("#date");
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
currentDate.innerHTML = `${month}/${date}/${year}`;

let currentTime = document.querySelector("#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hours}:${minutes}`;

function showTemp(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let displayedTemp = document.querySelector("#weather-now");
  displayedTemp.innerHTML = `${temperature}°`;
}
function search(city) {
  let units = "imperial";
  let myApi = "1abc917551b1a4a6a106d16dc2865cf5";
  let address = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${address}?q=${city}&appid=${myApi}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let celciusTemp = ((89 - 32) * 5) / 9;
  let tempElement = document.querySelector("#weather-now");
  tempElement.innerHTML = ` ${Math.round(celciusTemp)}°`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

let celciusLink = document.querySelector("#celcius-button");
celciusLink.addEventListener("click", displayCelciusTemp);

search("Austin");
