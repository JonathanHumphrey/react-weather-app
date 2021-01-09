import React, {useState, useEffect} from 'react'


import axios from 'axios'
import Geocode from 'react-geocode'

import './CSS/App.css';
import Search from './Components/Search';
import Weather from './Components/Weather';
import Alerts from './Components/Alerts';

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
  const [alert, setAlert] = useState()

  
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000)
    
  })


  Geocode.setApiKey('AIzaSyAapCvkx_g_yRcpFcYYEVYF6fGAxSMIM3s')
  const WEATHER_API_KEY = 'e2fc55d8fa20aecfaa3fb213f96df41d'
  
  // useEffect that waits for the submit flag to be true, this comes from the search component and grabs the location data based on address
  useEffect(() => {
    if (submitFlag === true) {
      Geocode.fromAddress(`${searchValue}`)
        .then(response => {
          let { lat, lng } = response.results[0].geometry.location
          console.log(lat, lng)
          setLocationTag(response.results[0].formatted_address)
          setLatitude((latitude) => (lat))
          setLongitude((longitude) => (lng))
          console.log(date.getMonth())
        },
        error => {
          console.error(error)
        },
      )
    }
  }, [submitFlag])

  //Seperate Use Effect that watches latitude and longitutde for their cahnges, this was done in order to assure the order of execution for the useEffect methods here
  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${WEATHER_API_KEY}&units=imperial`)
      .then(res => {
        console.log(res.data)
        setAlert(res.data.alerts['0'])
        let newArr = []
        setWeather(res.data.current)
        res.data.daily.map((day, i) => {
          newArr.push(day)
          
  
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
      {showWeather && !loading ? 
        <Weather
          weather={weather}
          setWeather={setWeather}
          forecast={forecast}
          setForecast={setForecast}
          date={date}
          loading={loading}
          isLoading={isLoading}
          locationTag={locationTag}
          submitFlag={submitFlag}
        />
      :
      <div>
          Loading...   
      </div>}

      {alert ? 
        <div className='alerts'>
          <Alerts
            alert={alert}
          />
        </div>
        :
        null}
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