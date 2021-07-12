import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Filter from './components/Filter'
import Countries from './components/Countries'


function App() {

  const [ countries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries');

  const handleSearch = (e) => {
    setNewSearch(e.target.value)
  }

  const countriesToShow = newSearch === ('')
    ? countries
    : countries.filter(country => country.name.toLocaleLowerCase()
    .includes(newSearch.toLocaleLowerCase()))

  return (
    <div>
      find countries:
      <Filter 
        newSearch={newSearch}
        handleSearch={handleSearch} />
      <Countries
        countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;
