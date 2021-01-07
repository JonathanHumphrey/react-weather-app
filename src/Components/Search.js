import React from 'react'

export default function Search(props) {

    const handleSearchInputChanges = (e) => {
        props.setSearchValue(e.target.value)
        
    }
    const callSearchFunction = (e) => {
       console.log(e.target)
        e.preventDefault()
        console.log(props.searchValue)
        props.setShow(true)
    }
    return (
        <div>
            <input
                className='searchInput'
                type="text"
                value={props.searchValue}
                  
            />
            <input onClick={callSearchFunction} type='submit' value='SEARCH' />
        </div>
    )
}
