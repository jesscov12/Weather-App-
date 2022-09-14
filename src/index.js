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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tues", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <div class="card-weekdays">
            <div class="card-body-box">
              <i class="fa-solid fa-sun"></i>
              <h5 class="card-text-weekdays">${day}</h5>
              <p>     
                86°/70° <br />
                3%
              </p>
            </div>
          </div>
          </div>
       `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}mph`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#city").innerHTML = response.data.name;
  fahrenheitTemperature = response.data.main.temp;
  let temperature = Math.round(fahrenheitTemperature);
  let displayedTemp = document.querySelector("#weather-now");
  displayedTemp.innerHTML = `${temperature}°`;

  getForecast(response.data.coord);
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
  let tempElement = document.querySelector("#weather-now");
  let celciusTemp = ((fahrenheitTemperature - 32) * 5) / 9;
  tempElement.innerHTML = `${Math.round(celciusTemp)}°`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#weather-now");
  tempElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

let fahrenheitTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

let celciusLink = document.querySelector("#celcius-button");
celciusLink.addEventListener("click", displayCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-button");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("Austin");
