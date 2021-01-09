import React from 'react'

export default function Forecast(props) {
    
    return (
        <div className='forecast'>
            <h3>{props.forecast[props.i].weather['0'].main}</h3>
            <h1>{props.forecast[props.i].temp.day.toFixed(0)}&#176;<p className='lowOfTheDay'>Low: {props.forecast[props.i].temp.min.toFixed(0)}&#176;</p></h1>
            <sub className='feelsLike'>Feels Like: {props.forecast[props.i].feels_like.day.toFixed(0)}&#176;</sub>
            <div className='otherStats'>
                <img></img>
                <p>{props.forecast[props.i].humidity}%</p>
            </div>
        </div>
    )
}
