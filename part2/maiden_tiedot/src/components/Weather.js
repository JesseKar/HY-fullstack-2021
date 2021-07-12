import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    //API KEY 6eba0b9ffa1ebe3444f8591469c15839
    //openweathermap.org
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    // SIIRRÄ USE EFFECTIT APP >>>>
    const apiKey = "6eba0b9ffa1ebe3444f8591469c15839"
    const [weather, setWeather] = useState([])
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`

    useEffect(() => {
        console.log('effect weather')
    axios
      .get(url)
      .then(response => {
        console.log('weather promise fulfilled');
        setWeather(response.data)
      })
    }, [])

    console.log('weather', weather);
    const tempToCelsius =  weather.main.temp - 273.15

    
    return (
        <div>
            <p>Temperature: {tempToCelsius.toFixed(1)} Celsius</p>
            <p>Wind {weather.wind.speed} ms</p>
        </div>
    )

}



export default Weather