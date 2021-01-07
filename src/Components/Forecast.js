import React from 'react'

export default function Forecast(props) {
    return (
        <div className='weatherBody'>
            <div className='forecast'>
                <div className='forecastDay'>
                    <p>{props.id}</p>
                </div>
            </div>
        </div>
    )
}
