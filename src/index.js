import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);
const formatTime = (ts) => new Date(ts * 1000).toLocaleTimeString();

app.get('/location/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const locationRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    const locationData = await locationRes.json();

    if (!locationData.length) return res.status(404).send('Location not found');

    const { lat, lon } = locationData[0];

    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    const weatherData = await weatherRes.json();

    console.log("=== Weather Report ===");
    console.log(`📍 Location: ${weatherData.name}, ${weatherData.sys.country}`);
    console.log(`📏 Coordinates: Lat ${weatherData.coord.lat}, Lon ${weatherData.coord.lon}`);
    console.log(`🌡️ Temperature: ${kelvinToCelsius(weatherData.main.temp)}°C`);
    console.log(`🤔 Feels Like: ${kelvinToCelsius(weatherData.main.feels_like)}°C`);
    console.log(`☁️ Condition: ${weatherData.weather[0].description}`);
    console.log(`💧 Humidity: ${weatherData.main.humidity}%`);
    console.log(`🌀 Wind: ${weatherData.wind.speed} m/s at ${weatherData.wind.deg}°`);
    console.log(`🌫️ Visibility: ${weatherData.visibility / 1000} km`);
    console.log(`🌅 Sunrise: ${formatTime(weatherData.sys.sunrise)}`);
    console.log(`🌇 Sunset: ${formatTime(weatherData.sys.sunset)}`);

    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Something went wrong while fetching weather data.');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});