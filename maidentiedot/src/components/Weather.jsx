import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  // Api avain on tallennettu .env tiedostoon.
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [capital, apiKey])

  if (weather === null) {
    return null
  }

  const icon = weather.weather[0].icon

  return (
    <div>
      <h2>Weather in {capital}</h2>

      <p>
        Temperature {weather.main.temp} Celsius
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={weather.weather[0].description}
      />

      <p>
        Wind {weather.wind.speed} m/s
      </p>
    </div>
  )
}

export default Weather