import React from 'react'

export default function Search(props) {

    const handleSearchInputChanges = (e) => {
        props.setSearchValue(e.target.value)
        
    }
    const callSearchFunction = (e) => {
        props.setSubmitFlag(true)
        props.setShow(true)
    }

    return (
        <div>
            <input
                className='searchInput'
                type="text"
                value={props.searchValue}
                onChange={handleSearchInputChanges}
            />
            <input onClick={callSearchFunction} type='submit' value='SEARCH' />
        </div>
    )
}
