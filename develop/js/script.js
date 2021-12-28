var apiKey = "a5b69e9f4aa63fd4ba7b33a69831a67c";
var currentLocation = "";

var getCurrentConditions = (event) => {
    let location = $("currentforecast-location").val();
    currentLocation= $("currentforecast-location").val();
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + state + country + "&units=imperial" + "&APPID=" + apiKey;
    fetch(queryURL)
    .then(handleErrors)
    .then((response) => {
        return response.json();
    })
    .then ((response) => {
        saveLocation(city, state, country);
        $("search-text").text("");
        let currentWeatherIcon="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
        let currentTimeUTC = response.dt;
        let currentTimeZoneOffset = response.timezone;
        let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);
        
        renderLocations();

        getFiveDayForecast(event);
        $("header-text").text(response.name);
        let currentForecastHTML = `
            <h3>${response.name} ${currentMoment.format("(MM/DD/YYYY)")}<img src="${currentWeatherIcon}"></h3>
            <div class="list-unstyled">
                <div>Temperature: ${response.main.temp}&#8457;</div>
                <div>Humidity: ${response.main.humidity}%</div>
                <div>Wind Speed: ${response.wind.speed} mph</div>
                <div id="uv">UV Index:</div>
            </div>`;
        $("current-forecast").html(currentForecastHTML);
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let uvQueryURL = "api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&APPID" + apiKey;
        fetch(uvQueryURL)
        .then (handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let uvIndex = response.value;
            $("uv").html(`UV: <span id="uvVal"> ${uvIndex}</span>`);
            if (unIndex >= 0 && uvIndex < 3){
                $('#uvVal').attr("class", "uv-favorable");
            } else if (uvIndex >= 3 && uvIndex < 8){
                $('#uvVal').attr("class", "uv-moderate");
            } else if (uvIndex >= 8){
                $('#uvVal').attr("class", "uv-severe");
            }
        });
    })
}

