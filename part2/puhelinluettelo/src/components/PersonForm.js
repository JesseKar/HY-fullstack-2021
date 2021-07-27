import React from 'react'
import restService from '../services/restMethods'

const PersonForm = (props) => {

const { persons, setPersons, 
    newName, setNewName, 
    newNumber, setNewNumber,
    handleNameChange, handleNumberChange,
    setEventMessage, setIsError } = props

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
      setIsError(false)
      setEventMessage(`Updated ${changedPerson.name}`)
      setTimeout(() => {
        setEventMessage(null)
        setIsError()
      }, 3000)
      setNewName('')
      setNewNumber('')
     })
     .catch(error => {
      setEventMessage(`Updating ${changedPerson.name} caused an error: Person was already deleted from server`)
      setIsError(true)
      setTimeout(() => {
        setEventMessage(null)
        setIsError()
      }, 5000)
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
            setIsError(false)
            setEventMessage(`${person.name} added`)
            setTimeout(() => {
              setEventMessage(null)
              setIsError()
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setEventMessage(`Adding ${person.name} caused an error`)
            setIsError(true)
            setTimeout(() => {
              setEventMessage(null)
            }, 5000)
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
          <button className="add" type="submit">add</button>
        </div>
      </form>
    )
}

  export default PersonForm