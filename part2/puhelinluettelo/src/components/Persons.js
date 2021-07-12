import React from 'react'

const Persons = (props) => {

    const { personsToShow } = props

    return (
        <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
          )}
      </ul>
    )
}

export default Persons