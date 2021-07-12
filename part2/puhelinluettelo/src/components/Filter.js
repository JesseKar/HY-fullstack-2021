import React from 'react'

const Filter = (props) => {

    const { newSearch, handleSearchChange } = props

    return (
        <div>
        Search:
        <input 
          value={newSearch}
          onChange={handleSearchChange}/>
      </div>
    )
}

export default Filter