import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  const url = 'https://restcountries.com/v3.1/all'
  const [countries, setCounries] = useState([])
  const [filterCountries, setNewFilterCountries] = useState(countries)
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {    
    axios.get(url).then(response => {
      const allCountries = response.data
      console.log(allCountries)   
      setCounries(allCountries)
      setNewFilterCountries('')
    })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
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
    }
    
  }

  return (
    <div>
    <Filter newFilter={newFilter} handleFilter={handleFilter}/>
    <Countries filterCountries={filterCountries}/>
    </div>
  );
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
      <ul>
        {props.filterCountries.map(country => 
        <li>
            <p>{country.name.common}</p>
        </li>
      )}
      </ul>
    )
  } else if (props.filterCountries.length === 1) {
    return <Country country={props.filterCountries[0]}/> 
  }
}

const Country = ({country}) => {
  console.log(country.languages)
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
    </div>
  )
}
export default App;
