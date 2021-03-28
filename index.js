const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const appkey = require('./api_key.js')

let file = fs.readFileSync(`${__dirname}/weather.json`, 'utf8')
if (file == "") {
    fs.writeFileSync(`${__dirname}/weather.json`, '[{}]', 'utf8')
}

const api_key = appkey.mysecretkey;
const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=42.36&lon=-71.07&exclude=minutely,hourly,daily&units=imperial&appid=${api_key}`
async function fetchWeather() {
    try {
        const response = await fetch(uri);
        const weather = await response.json();
        return weather;
    } catch (error) {
        console.log("Web service not returning data");
    }
}

async function run() {
    let weather = await fetchWeather();

    let unix_timestamp = weather.current.dt;
    let local_date = new Date((unix_timestamp) * 1000).toLocaleDateString("en-US", { timeZone: "America/New_York" });
    let local_time = new Date((unix_timestamp) * 1000).toLocaleTimeString("en-US", { timeZone: "America/New_York" });
    let sunrise = weather.current.sunrise;
    let local_sunrise = new Date((sunrise) * 1000).toLocaleTimeString("en-US", { timeZone: "America/New_York" });
    let sunset = weather.current.sunset;
    let local_sunset = new Date((sunset) * 1000).toLocaleTimeString("en-US", { timeZone: "America/New_York" });
    let current_temp = weather.current.temp;
    let feels_like = weather.current.feels_like;
    let weather_desc = weather.current.weather[0].description;
    let pressure = weather.current.pressure;
    let humidity = weather.current.humidity;
    let windspeed = weather.current.wind_speed;

    let weathersnapshot = Object.assign({
        timestamp: unix_timestamp,
        date: local_date,
        time: local_time,
        sunrise: local_sunrise,
        sunset: local_sunset,
        temp: current_temp,
        feels: feels_like,
        desc: weather_desc,
        pressure: pressure,
        humidity: humidity,
        windspeed: windspeed
    });

    const weatherdata = JSON.parse(fs.readFileSync(`${__dirname}/weather.json`))
    weatherdata.push(weathersnapshot)
    fs.writeFile(`${__dirname}/weather.json`, JSON.stringify(weatherdata, 0, 4), (err, res) => {
        if (err) throw err;
        console.log("Snapshot written to json file.")
    })
}

run().catch(console.dir);