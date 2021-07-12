import React from 'react'

const Filter = (props) => {

    const { newSearch, handleSearch } = props

    return (
        <div>
        <input 
          value={newSearch}
          onChange={handleSearch}/>
      </div>
    )
}

export default Filter