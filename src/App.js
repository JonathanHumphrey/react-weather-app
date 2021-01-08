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
  
  useEffect(() => {
    if (submitFlag === true) {
      Geocode.fromAddress(`${searchValue}`).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location
          setLocationTag(response.results[0].formatted_address)
          setLatitude(lat)
          setLongitude(lng)
          console.log(response.results[0])
          isLoading(true)
        },
        error => {
          console.error(error)
        },
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${WEATHER_API_KEY}&units=imperial`)
        .then(res => {
          console.log(res.data.current)
          
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
      )
    }
  }, [submitFlag])

   const search = searchValue => {
     setSubmitFlag(!submitFlag)
  } 

  return (
    <div className="App">
      <Search
        search={search}
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
            <p></p>
            <div className='weatherHeader'>
              <div className='leftHeader'>
                <p>{date.toLocaleDateString()}</p>
                <p>{date.toLocaleTimeString()}</p>
              </div>
              <div className='middleHeader'>
                <p>{}</p>
                <h1>{weather.temp}&#176;</h1>
                <sub className='feelsLike'>Feels Like: {weather.feels_like}&#176;</sub>
              </div>
              <div className='RightHeader'>
                <p>Clouds: {weather.clouds <= 1 ? "Clear" : weather.clouds}</p>
                <p>Dew Point: {weather.dew_point}</p>
              </div>
            </div>
            {/*END OF HEADER*/}
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
          : <div>
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