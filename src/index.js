let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let updatedDate = document.querySelector("#current-time");
updatedDate.innerHTML = `${day}, ${hours}:${minutes}`;

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
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  let degrees = document.querySelector("#api-temp");
  degrees.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#api-humid");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  let wind = document.querySelector("#api-wind");
  wind.innerHTML = `Windspeed ${response.data.wind.speed}km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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
