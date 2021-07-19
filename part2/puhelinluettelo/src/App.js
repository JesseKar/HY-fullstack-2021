import React, { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import restService from './services/restMethods'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

//useEffectillä haetaan data db.jsonin 3001 portissa
// olevalta sivulta localhost:3001/persons, haut tapahtuu nyt restMethodsissa service hakemistossa
useEffect(() => {
  console.log('effect');
  restService
    .getAll()
    .then(initialPersons => {
      console.log('promise fulfilled');
      setPersons(initialPersons)
    })
}, [])

console.log('render', persons.length, 'notes')

// Handle input changes
  const handleNameChange = (e) => {
    setNewName(e.target.value)
    //näyttää inputin muutokset konsolissa
    //console.log(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value)
  }

  const deletePerson = deletedPerson => {
    const warning = window.confirm(`Do you want to delete ${deletedPerson.name}?`)
    if (warning) {
      restService
        .remove(deletedPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          console.log('delete succesfull', deletedPerson.name);
        })
    }
  }

// etsitaan listasta ne nimet jotka sisaltaa 
// newSearchin jossain kohdassa, pieniksi kirjaimiksi muutettuna
  const personsToShow = newSearch === ('')
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase()
    .includes(newSearch.toLocaleLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
        />
      <h3>Add new</h3>
      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        />
      <h3>Numbers</h3>
      <Persons 
        personsToShow={personsToShow}
        persons={persons}
        setPersons={setPersons}
        deletePerson={deletePerson}
      />
      
    </div>
  )

}

export default App