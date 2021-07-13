import React, { useEffect, useState } from 'react'
import axios from 'axios'

const weatherUrlBasic = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const addCityParam = 'q'
const addAppiId = 'appid'
const iconUrlBasic = 'http://openweathermap.org/img/wn/{icon}@2x.png'
const apiKey = process.env.REACT_APP_API_KEY

const newWeatherUrl = (country) => {
  const newUrl = new URL(weatherUrlBasic);
  newUrl.searchParams.append(addCityParam, country.capital);
  newUrl.searchParams.append(addAppiId, apiKey);
  return newUrl.toString();
}

const Weather = ( {country} ) => {
    
    const [weather, setWeather] = useState(undefined)
    const [iconUrl, setIconUrl] = useState('')

    console.log('capital is', country.capital);
    const weatherUrl = newWeatherUrl(country)
    // `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
    console.log(weatherUrl);

    useEffect(() => {
    console.log('effect weather')
    axios
      .get(weatherUrl)
      .then(response => {
        console.log('weather promise fulfilled');
        const icon = response.data.weather[0].icon
        const iconUrl = iconUrlBasic.replace("{icon}", icon)
        setWeather(response.data)
        setIconUrl(iconUrl)
      })
    }, [weatherUrl])
  
    console.log('weather', weather);

    if(weather){
      return (
        <div>
            <h3>Weather</h3>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={iconUrl} alt='icon' />
            <p>Wind {weather.wind.speed} ms</p>
        </div>
    )
    } else {
        return (
        <p>weather fetch failed</p>
      )}
    
    

}



export default Weather