import React from 'react'
import restService from '../services/restMethods'

const Persons = (props) => {

    const { personsToShow, deletePerson } = props

    return (
        <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}
            <button onClick={() => deletePerson(person)}>delete</button>
          </li>
          )}
      </ul>
    )
}

export default Persons