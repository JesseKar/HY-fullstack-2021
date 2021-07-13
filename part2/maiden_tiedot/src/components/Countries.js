import React from 'react'
import Weather from './Weather';

const Countries = (props) => {

    const { countriesToShow } = props
    console.log(countriesToShow.length);

    
    if (countriesToShow.length === 1){
        console.log(countriesToShow[0].name);
        const flag = countriesToShow[0].flag
      return (
          <div>
            <h1>{countriesToShow[0].name}</h1>
            <p>Capital: {countriesToShow[0].capital}</p>
            <p>Population: {countriesToShow[0].population}</p>
            <h3>Languages</h3>
                {countriesToShow[0].languages.map(lang =>
                    <li key={lang.name}>{lang.name}</li>)}
          <img src={flag} alt="flag" width="200" height="150"/>
          <Weather 
            country={countriesToShow[0]}/>
          </div>
      )
      } 
    else if(countriesToShow.length > 1 && countriesToShow.length < 10){
      return (
        <div>
        {countriesToShow.map(country =>
        <p key={country.numericCode}>{country.name}</p>)}
        </div>
        )
    } else {
        return (
            <p>too many matches, specify search</p>
            )
    }
}

export default Countries