const locationForm = document.getElementById("locationForm");
const displayWeather = document.getElementsByClassName("weatherInfo");

locationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = document.getElementById("location");
    getWeatherData(location.value.trim());

})

async function getWeatherData(location) {
    const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' 
        + location
        + '&units=metric'
        + '&APPID=d5cedfae3e8206f60bc41453f0ef8ebe';
        console.log(apiCall);

    const response = await fetch (apiCall, {mode: 'cors'});
    const weatherData = await response.json();

    console.log(weatherData.name);
}