import React from 'react'
import restService from '../services/restMethods'

const PersonForm = (props) => {

const { persons, setPersons, 
    newName, setNewName, 
    newNumber, setNewNumber,
    handleNameChange, handleNumberChange } = props

const handleAdding = (e) => {
  e.preventDefault()
  // check doubles
  if(persons.filter(person => person.name === newName).length > 0){
    const warning = window.confirm(`${newName} already exists in phonebook, replace old number with a new one?`)
    if(warning) {
      updatePerson(newName)
    } 
  } else {
    addPerson()
  }
}

const updatePerson = (name) => {
  const oldPerson = persons.find(p => p.name === name)
  const changedPerson = { ...oldPerson, number: newNumber}
  console.log('update started')

  restService
    .update(changedPerson.id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(p => p.id !== oldPerson.id ? p : returnedPerson))
      console.log('number update succesfull', oldPerson.name);
     })
    
}

const addPerson = () => {
    const person = {
      name: newName,
      number: newNumber
    }
    console.log('adding new started')

        restService
          .create(person)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            console.log('added', person.name);
            setNewName('')
            setNewNumber('')
          })
}


    return(
    <form onSubmit={handleAdding}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange}/>
        </div>
        <br />
        <div>
          number: 
          <input 
            value={newNumber} 
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

  export default PersonForm