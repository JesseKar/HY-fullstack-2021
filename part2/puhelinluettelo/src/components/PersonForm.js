import React from 'react'

const PersonForm = (props) => {

const { persons, setPersons, 
    newName, setNewName, 
    newNumber, setNewNumber,
    handleNameChange, handleNumberChange } = props

const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    
    if(persons.filter(value => 
      value.name === person.name).length > 0) {
        console.log('double name check, name exists already')
        window.alert(`${newName} already exists`)
      } else {
        setPersons(persons.concat(person))
        console.log('added', person.name);
        setNewName('')
        setNewNumber('')
        }
  }

    return(
    <form onSubmit={addPerson}>
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