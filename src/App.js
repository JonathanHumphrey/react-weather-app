import React, {useState, useEffect} from 'react'
import Forecast from './Components/Forecast'

import axios from 'axios'
import Geocode from 'react-geocode'

import './App.css';
import Search from './Components/Search';

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [showWeather, setShow] = useState(false)
  const [locationTag, setLocationTag] = useState('')
  const [date, setDate] = useState(new Date())
  const [weather, setWeather] = useState([])
  const [forecast, setForecast] = useState([{}])
  const [loading, isLoading] = useState(true)
  const [submitFlag, setSubmitFlag] = useState(false)
  
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000)
  })


  Geocode.setApiKey('AIzaSyAapCvkx_g_yRcpFcYYEVYF6fGAxSMIM3s')
  const WEATHER_API_KEY = 'e2fc55d8fa20aecfaa3fb213f96df41d'
  
  if (searchValue !== undefined) {
    
  }

  useEffect(() => {
    if (submitFlag === true) {
      Geocode.fromAddress(`${searchValue}`)
        .then(response => {
          let { lat, lng } = response.results[0].geometry.location
          console.log(lat, lng)
          setLocationTag(response.results[0].formatted_address)
          setLatitude((latitude) => (lat))
          setLongitude((longitude) => (lng))
          console.log(response.results[0])
        },
        error => {
          console.error(error)
        },
      )
    }
  }, [submitFlag])

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${WEATHER_API_KEY}&units=imperial`)
      .then(res => {
        console.log(res.data)
        console.log(res.data.current.weather['0'].main)
        let newArr = []
        setWeather(res.data.current)
        res.data.daily.map((day, i) => {
          //console.log(day)
          newArr.push(day)
          //setForecast([...forecast, day])
          console.log(newArr)
  
          return newArr
        })
        setForecast(newArr)
        isLoading(false)
      })
    }
  }, [latitude, longitude])

  return (
    <div className="App">
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        showWeather={showWeather}
        setShow={setShow}
        submitFlag={submitFlag}
        setSubmitFlag={setSubmitFlag}
      />
      <div className='weatherContainer'>
        {showWeather && !loading ?
          <div> 
            <h1>{locationTag}</h1>
            <div className='weatherHeader'>
              <div className='leftHeader'>
                <p>{date.toLocaleDateString()}</p>
                <p>{date.toLocaleTimeString()}</p>
              </div>
              <div className='middleHeader'>
                <p className='weatherType'>{weather.weather['0'].main}</p>
                <h1>{weather.temp.toFixed(0)}&#176;</h1>
                <sub className='feelsLike'>Feels Like: {weather.feels_like.toFixed(0)}&#176;</sub>
              </div>
              <div className='rightHeader'>
                <p>Clouds: {weather.clouds <= 1 ? "Clear" : weather.clouds}</p>
                <p>Dew Point: {weather.dew_point}</p>
              </div>
            </div>
            {/*END OF HEADER*/}
            <h3>7-Day Forecast</h3>
            <div className='weatherBody'>
              {forecast?.map((day, i) => {
                return (
                  <Forecast
                    i={i}
                    forecast={forecast}
                  />
                )
              })}
            </div>
          </div>
          :
          <div>
            Loading...   
          </div>}
      </div>
    </div>
  );
}

export default App;
/* {forecast?.map((day) => {
  return (
    <div>
      <p>{day.temp}</p>
    </div>
  )
})} */