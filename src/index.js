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

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//challenge2

function searchCity(city) {
  let apiKey = "197a5ad85f9efe7ac594ce5195482502";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  //let userCity = document.querySelector("h1");
  //let cityInput = document.querySelector("#city-input");
  //userCity.innerHTML = cityInput.value;
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//weather from API

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#api-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#api-humidity"
  ).innerHTML = `Humidity ${response.data.main.humidity}%`;
  document.querySelector(
    "#api-wind"
  ).innerHTML = `Windspeed ${response.data.wind.speed}m/ph`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
}
// position challenge
function getCurrentLocation() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let apiKey = "197a5ad85f9efe7ac594ce5195482502";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let location = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(location).then(showTemperature);
}

let userForm = document.querySelector(".search-form");
userForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("New York");
