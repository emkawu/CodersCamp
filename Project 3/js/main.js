var weather = [];
var api = 'ccae267e1a55d53cf1ab8f6571f60afc';
var city = '5226932';
var citiesList;

var body = document.querySelector('body');
var h1 = document.querySelector('h1');
var p = document.querySelector('p');
var canvas = document.querySelector('canvas');
var search = document.querySelector('#search');
var listaMiast = document.querySelector('#listaMiast');

var icons = new Skycons({
    "color": "#2196f3"
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
    fetch('http://127.0.0.1:5500/city.list.json')
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${api}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            h1.innerText = data.name;
            p.innerText = data.weather[0].description;
            canvas.id = data.weather[0].icon;
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

getWeatherCity('6695624');
getCitiesList();
//search.addEventListener('change', searchCity);
search.addEventListener('keyup', searchCity);
listaMiast.addEventListener('click', showWeather);