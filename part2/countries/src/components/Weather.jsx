import { useState, useEffect } from 'react'
import weatherService from "../services/weather"

const Weather = (props) => {
    const city = props.city
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!city) return

        setLoading(true)
        setError(null)

        weatherService.getCityWeather(city).then(data => {
            setWeatherData(data)
            setLoading(false)
        }).catch(err => {
            setError('Failed to fetch weather data')
            setLoading(false)
            console.error('Weather API error:', err)
        });
    }, [city])

    if (!city) return null

    if (loading) return <div>Loading weather data...</div>
    if (error) return <div>{error}</div>
    if (!weatherData) return null

    return (
        <div>
            <h3>Weather in {city}</h3>
            <div>
                <p>Temperature: {weatherData.temperature}°C</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                    alt={weatherData.condition}
                />
            </div>
            <div>
                <p>Wind: {weatherData.windSpeed} m/s</p>
                <p>Humidity: {weatherData.humidity}%</p>
            </div>
        </div>
    )
}

export default Weather
