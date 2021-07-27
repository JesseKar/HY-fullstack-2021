import React from 'react'

const Persons = (props) => {

    const { personsToShow, deletePerson } = props

    return (
        <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}
            <button onClick={() => deletePerson(person)} className="delete">x</button>
          </li>
          )}
      </ul>
    )
}

export default Persons