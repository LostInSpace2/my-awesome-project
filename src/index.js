let now = new Date();

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
	minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

function celsiusToFahrenheit(event) {
	event.preventDefault();
	let changeToFahrenheit = document.querySelector("#currentTempText");
	changeToFahrenheit.innerHTML = 82;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event) {
	event.preventDefault();
	let changeToCelcius = document.querySelector("#currentTempText");
	changeToCelcius.innerHTML = 28;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", fahrenheitToCelsius);

function displayWeather(response) {
	console.log(response.data);

	let city = response.data.name;
	let currentCity = document.querySelector("#cityName");
	currentCity.innerHTML = `${city}`;

	let temperature = Math.round(response.data.main.temp);
	let currentTemperature = document.querySelector("#currentTempText");
	currentTemperature.innerHTML = `${temperature}`;

	let description = response.data.weather[0].description;
	let currentDescription = document.querySelector("#weatherDescription");
	currentDescription.innerHTML = `${description}`;

	let feelsLike = Math.round(response.data.main.feels_like);
	let displayFeelsLike = document.querySelector("#feelsLike");
	displayFeelsLike.innerHTML = `Feels like: ${feelsLike}°C`;

	let humidity = Math.round(response.data.main.humidity);
	let displayHumidity = document.querySelector("#humidity");
	displayHumidity.innerHTML = `Humidity: ${humidity}%`;

	let wind = Math.round(response.data.wind.speed);
	let displayWind = document.querySelector("#wind");
	displayWind.innerHTML = `Wind: ${wind} km/h`;
}

function searchCity(city) {
	let apiKey = "cab5b6ee74c93775e95f76838552f1ed";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeather);
}

function changeCity(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#city-input");
	let city = cityInput.value;
	searchCity(city);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", changeCity);

function showCurrentLocation(position) {
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "fe1483f743b581b5520a1b725af03a49";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let LocateButton = document.querySelector("#locate-button");
LocateButton.addEventListener("click", getCurrentLocation);
