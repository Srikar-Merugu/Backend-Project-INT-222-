const express = require("express");
const request = require("request");

const app = express();

// Use environment variable to keep the API key secure
// const API_KEY = d3c371bb0a5d52c7b79ff4f3472281af;
const API_KEY = "d3c371bb0a5d52c7b79ff4f3472281af";


app.get('/', (req, res) => {
    let city = req.query.city;
    if (!city) {
        return res.status(400).send("City is required as a query parameter.");
    }
    // Updated URL to use real-time data endpoint and your actual API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    request(url, function (error, response, body) {
        if (error) {
            return res.status(500).send("Error fetching weather data");
        }
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send(`Failed to fetch data for city: ${city}`);
        }

        let data = JSON.parse(body);
        if (data && data.list && data.list.length > 0 && data.list[0].weather) {
            res.send(`The weather in your city "${city}" is ${data.list[0].weather[0].description}`);
        } else {
            res.status(404).send("Weather data not found for the specified city");
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));
