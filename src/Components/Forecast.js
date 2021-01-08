import React from 'react'

export default function Forecast(props) {
    
    return (
        <div className='forecast'>
            <h1>{props.forecast[props.i].temp.day}</h1>
            <sub className='feelsLike'>Feels Like: {props.forecast[props.i].feels_like.day}</sub>
            <div>

            </div>
        </div>
    )
}
