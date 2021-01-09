import React from 'react'
import Forecast from './Forecast'

import {WiCloud, WiStrongWind, WiDaySunny, WiHumidity} from 'weather-icons-react'

export default function WeatherHeader({weather, showWeather, loading, locationTag, forecast, setForecast, date, submitFlag}) {
    return (
      <div>
        <div className='weatherContainer'>
            <div> 
              <h1>{locationTag}</h1>
              <div className='weatherHeader'>
                <div className='leftHeader'>
                  <p className='dateCurrent'>{date.toLocaleDateString()}</p>
                  <p className='time'>{date.toLocaleTimeString()}</p>
                </div>
                <div className='middleHeader'>
                    <p className='weatherType'>{weather.weather['0'].main}</p>
                    <h1 className='mainTemp'>{weather.temp.toFixed(0)}&#176;</h1>
                    <sub className='feelsLike'>Feels Like: {weather.feels_like.toFixed(0)}&#176;</sub>
                </div>
                <div className='rightHeader'>
                  <WiCloud size={30} />      
                  <p> {weather.clouds <= 1 ? "Clear" : weather.clouds}</p>
                  <hr />
                  <WiHumidity size={30} />
                  <p>{weather.humidity}%</p>
                  <hr />
                  <p>Dew Point: {weather.dew_point}</p>
                  <hr />
                </div>
              </div>
              {/*END OF HEADER*/}
              <h3>7-Day Forecast</h3>
              <div className='weatherBody'>
                {forecast?.map((days, i) => {
                  
                  let month = date.getMonth()
                  let day = date.getDate()
                  
                  return (
                    <Forecast
                      i={i}
                      forecast={forecast}
                      date={date}
                      day={day}
                      month={month}
                    />
                  )
                })}
          </div>
          </div>
        </div>
      </div>
    )
}
