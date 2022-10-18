const locationForm = document.getElementById("locationForm");
const displayWeather = document.getElementById("weatherGrid");
const resetBtn = `<h1 id="resetIcon" class="cityName" onclick="window.location.reload();">&#8634</h1>`;

locationForm.addEventListener("submit", (event) => {
    displayWeather.textContent = '';
    event.preventDefault();
    const location = document.getElementById("location").value.trim();
    getWeatherData(location);
})

function errorMsgDisplay() {
    displayWeather.innerHTML += `<h1 class="cityName">Oops !</h1>
        <h1 class="cityName">An error has occured. Please try again !</h1>`
        + resetBtn;
}

function addLoader() {
    displayWeather.innerHTML += '<div id="loader"></div>';
}

function removeLoader() {
    document.getElementById("loader").remove();
}

function buildAPICall (location) {
    return ('https://api.openweathermap.org/data/2.5/weather?q=' 
    + location
    + '&units=metric&APPID=d5cedfae3e8206f60bc41453f0ef8ebe');
}

async function getWeatherData(location) {
    addLoader();

    try {
        const response = await fetch (buildAPICall(location), {mode: 'cors'});
        const weatherData = await response.json();

        addWeatherToDisplay(weatherData);

    } catch (error) {
        errorMsgDisplay();
    }

    removeLoader();
}

function addWeatherToDisplay(weatherData) {
    const iconUrl = 'https://openweathermap.org/img/w/';
    displayWeather.innerHTML +=
        `<h1 class="cityName">&#8595</h1>
        <h1 class="cityName">${weatherData.name}</h1>
        <div class="weatherGrid">
            <h3 id="temp" class="weatherTemp">${weatherData.main.temp} ℃</h3>
            <h4 id="feelsLike" class="weatherLines">Feels like ${weatherData.main.feels_like} ℃</h4>
            <img id=icon class="weatherIcon" src="${iconUrl+weatherData.weather[0].icon+".png"}" alt="Weather icon">
            <h4 id="description" class="weatherLines">${weatherData.weather[0].description}</h4>
            <h4 id="wind" class="weatherLines">Wind: ${weatherData.wind.speed} km/h</h4>
            <h4 id="humidity" class="weatherLines">Humidity: ${weatherData.main.humidity} %</h4>
            <h4 id="visibility" class="weatherLines">Visibility: ${(weatherData.visibility/1000)}  km</h4>
        </div>`
        + resetBtn;
}