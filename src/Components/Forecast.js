import React, {useState} from 'react'

import { WiHumidity, WiRain } from 'weather-icons-react'

export default function Forecast(props) { 
    return (
        <div className='forecast'>
            <div className='date'>
                <h5>{props.month === 0 ? props.month + 1 : props.month}/{props.day + props.i}</h5>
            </div>
            <h3>{props.forecast[props.i].weather['0'].main}</h3>
            <h1>{props.forecast[props.i].temp.day.toFixed(0)}&#176;<p className='lowOfTheDay'>Low: {props.forecast[props.i].temp.min.toFixed(0)}&#176;</p></h1>
            <sub className='feelsLike'>Feels Like: {props.forecast[props.i].feels_like.day.toFixed(0)}&#176;</sub>
            <div className='otherStats'>
                <p><WiHumidity size={24} color='#ffffff' />{props.forecast[props.i].humidity}%</p>
                {props.forecast[props.i].weather['0'].main === 'Rain' ? 
                    <p><WiRain size={24} color='#ffffff' />{props.forecast[props.i].rain.toFixed(0)}%</p>
                    :
                    null
                }
            </div>
        </div>
    )
}
