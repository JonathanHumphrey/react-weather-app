import React from 'react'

export default function Search(props) {

    const handleSearchInputChanges = (e) => {
        props.setSearchValue(e.target.value)
        
    }
    const callSearchFunction = (e) => {
        e.preventDefault()
        props.setSubmitFlag(!props.submitFlag)
        props.setShow(!props.showWeather)
    }

    return (
        <div>
            <h1>Enter Your City Name</h1>
            <input
                className='searchInput'
                type="text"
                value={props.searchValue}
                onChange={handleSearchInputChanges}
            />
            <input className='submitBtn' onClick={callSearchFunction} type='submit' value='SEARCH' />
        </div>
    )
}
