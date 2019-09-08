var weather = [];
var api = 'ccae267e1a55d53cf1ab8f6571f60afc';
var city = '5226932';
var citiesList;

//var body = document.querySelector('body');
var cityName = document.querySelector('#city-name');
var temp = document.querySelector('#temp');
var day = document.querySelector('#dayToday');
var date = document.querySelector('#dateToday');
//var p = document.querySelector('p');
var canvas = document.querySelector('#canvasToday');
var wind = document.querySelector('#windToday');
var humidity = document.querySelector('#humidityToday');
var pressure = document.querySelector('#pressureToday');
var clouds = document.querySelector('#cloudsToday');

var search = document.querySelector('#search');
var listaMiast = document.querySelector('#listaMiast');

var icons = new Skycons({
    "color": "#e83e8c"
});

function setIcons() {
    /*icons.set("clear-day", Skycons.CLEAR_DAY);
    icons.set("clear-night", Skycons.CLEAR_NIGHT);
    icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("cloudy", Skycons.CLOUDY);
    icons.set("rain", Skycons.RAIN);
    icons.set("sleet", Skycons.SLEET);
    icons.set("snow", Skycons.SNOW);
    icons.set("wind", Skycons.WIND);
    icons.set("fog", Skycons.FOG);*/


    icons.set("01n", Skycons.CLEAR_DAY);
    icons.set("01n", Skycons.CLEAR_NIGHT);
    icons.set("02d", Skycons.PARTLY_CLOUDY_DAY);
    icons.set("02n", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("03d", Skycons.CLOUDY);
    icons.set("03n", Skycons.CLOUDY);
    icons.set("04d", Skycons.CLOUDY);
    icons.set("04n", Skycons.CLOUDY);
    icons.set("09d", Skycons.RAIN);
    icons.set("09n", Skycons.RAIN);
    icons.set("10d", Skycons.RAIN);
    icons.set("10n", Skycons.RAIN);
    icons.set("11d", Skycons.SLEET);
    icons.set("11n", Skycons.SLEET);

    icons.set("13d", Skycons.SNOW);
    icons.set("13n", Skycons.SNOW);

    icons.set("wind", Skycons.WIND);

    icons.set("50d", Skycons.FOG);
    icons.set("50n", Skycons.FOG);

    icons.play();
}

function getCitiesList() {
    fetch('http://127.0.0.1:5500/js/city.list.json')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            citiesList = data.filter(item => item.country === "PL");
            //return data.filter(item => item.country === "PL");
            //console.log(citiesList);
        })
        .catch(error => console.log(`error getWeatherCity: ${error.message}`));
}

function createUrl() {
    return `https://api.openweathermap.org/data/2.5/weather?id=${city}&APPID=${api}`;
}

function getWeatherCity(id) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=pl&APPID=${api}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            cityName.innerText = data.name;
            day.innerText = `${(new Date()).toLocaleDateString('en-US',{ weekday: 'long'})}`;
            date.innerHTML = `<small>${new Date().toLocaleDateString()}</small>`;
            temp.innerText = `${Math.round(data.main.temp - 273.15)}°C`;
            //p.innerText = data.weather[0].description;
            canvas.id = data.weather[0].icon;
            humidity.innerText = `${data.main.humidity}%`;
            pressure.innerText = `${data.main.pressure}hpa`
            wind.innerText = `${data.wind.speed} m/s`;
            clouds.innerText = `${data.clouds.all}%`;

            setIcons();
        })
        .catch(e => console.error(`error getWeatherCity: ${e.message}`));
}

function findMaches(wordToMach, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMach, 'gi');
        return place.name.match(regex);
    })
}

function searchCity() {
    //console.log(this.value);
    var searchCity = this.value;
    if (searchCity.length > 2) {
        var maches = findMaches(searchCity, citiesList);

        //console.log(maches);

        var htmlMatches = maches.map(item => {
            const regex = new RegExp(searchCity, 'gi');
            const cityName = item.name.replace(regex, `<b>${searchCity}</b>`);
            return `<li id="${item.id}">${cityName}</li>`
        }).join("");

        if (htmlMatches.length > 0) {
            listaMiast.innerHTML = htmlMatches;
        } else {
            listaMiast.innerHTML = "<li>Brak wyników</li>";
        }
    } else {
        listaMiast.innerHTML = "Zacznij pisać";
    }
}

function showWeather(e) {
    //console.log(e.target.id);
    if (!e.target.matches('li')) return;
    getWeatherCity(e.target.id);
}

getWeatherCity('3081368');
getCitiesList();
setIcons();

//search.addEventListener('keyup', searchCity);
//listaMiast.addEventListener('click', showWeather);