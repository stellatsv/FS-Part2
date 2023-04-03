import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  const url = 'https://restcountries.com/v3.1/all'
  const [countries, setCounries] = useState([])
  const [filterCountries, setNewFilterCountries] = useState(countries)
  const [newFilter, setNewFilter] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  const hook = () => {    
    axios.get(url).then(response => {
      const allCountries = response.data
      console.log(allCountries)   
      setCounries(allCountries)
      setNewFilterCountries([])
      setShowCountry('')
    })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    event.preventDefault()
    if (event.target.value !== '') {
      var filter = event.target.value
      console.log(filter)
      setNewFilter(filter)
      const filtered = countries.filter(country => (
        country.name.common.toUpperCase().includes(filter.toUpperCase()))
      )
      setNewFilterCountries(filtered)
    } else {
      setNewFilterCountries(countries)
      setNewFilter('')
      setShowCountry('')
    }
    
  }

  const showCountryOnPage = (event) => {
    event.preventDefault()
    setShowCountry(event.target.getAttribute('country'))
  }

  return (
    <div>
    <Filter newFilter={newFilter} handleFilter={handleFilter}/>
    <Countries filterCountries={filterCountries} showCountryOnPage={showCountryOnPage}
      showCountry={showCountry}/>
    </div>
  );
}

const Weather = (props) => {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')
  const [iconDescription, setIconDescription] = useState('')
 
  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + props.city + '&appid=' + api_key + '&units=metric'
    axios.get(url).then(response => {
      const weatherData = response.data
      console.log(weatherData)
      setCity(weatherData.name)
      setCountry(weatherData.sys.country)
      setTemperature(weatherData.main.temp)
      setWind(weatherData.wind.speed)
      setIcon(weatherData.weather[0].icon)
      setIconDescription(weatherData.weather[0].description)
    })
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Weather in {city}, {country}</h2>
      <p><b>temperature:</b> {temperature} Celsius</p>

      <img src={'http://openweathermap.org/img/w/' + icon + '.png'} alt={iconDescription}/>

      <p><b>wind:</b> {wind} m/s </p>
    </div>
  )

}


const Filter = (props) => {
  return (<form>
    <div>
      find countries: <input value={props.newFilter}
      onChange={props.handleFilter}/>
    </div>
  </form>)
}

const Countries = (props) => {
  if (props.filterCountries.length > 10) {
    return <p>Too many matches, specify another filter </p>
  } else if (props.filterCountries.length<=10 && props.filterCountries.length>2) {
    return (
      <div>
        <ul>
          {props.filterCountries.map(country => 
          <li>
            <form onSubmit={props.showCountryOnPage} country={country.name.common}>
              <p>{country.name.common}</p>
              <input type="submit" value="Show"/>
            </form>
          </li>
        )}
        </ul>
        <Country countryName={props.showCountry} filterCountries={props.filterCountries}/>
      </div>
    )
  } else if (props.filterCountries.length === 1) {
    return <Country countryName={props.filterCountries[0].name.common} filterCountries={props.filterCountries}/> 
  }

 
}

const Country = (props) => {
  const countryName = props.countryName
  if (countryName !== '') {     
    const country = props.filterCountries.find(country => countryName===country.name.common)
    return (
      <div>
        <h1> {country.name.common} </h1>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
        <h2>Languages: </h2>
          <ul>
            {Object.keys(country.languages).map(index => 
              <li>
                  <p>{country.languages[index]}</p>
              </li>
            )}
          </ul>
          <p>{country.flag}</p>
          <Weather city={country.capital[0]}/>
      </div>
    )
  }
}
export default App;
