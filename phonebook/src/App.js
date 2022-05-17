import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filterPersons, setNewFilterPersons] = useState(persons)

  const hook = () => {    
    console.log('effect')    
    axios.get('http://localhost:3001/persons').then(response => {        
      console.log('promise fulfilled')        
      setPersons(response.data)   
      setNewFilterPersons(response.data)   
    }) 
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addNumber = (event) => {
    let names = persons.map(person => person.name);
    console.log("values", names)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)      
    } else {
      event.preventDefault()
      const newEntry = {name: newName, number: newNumber}
      setPersons(persons.concat(newEntry))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    if (event.target.value !== '') {
      console.log(event.target.value)
      setNewFilter(event.target.value)

      const filtered = persons.filter(person => 
        person.name.toUpperCase().includes(
          newFilter.toUpperCase()))
      setNewFilterPersons(filtered)
    } else {
      setNewFilterPersons(persons)
      setNewFilter('')
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new</h3>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange = {handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter}/>
      <Persons filterPersons={filterPersons}/>
    </div>
  )
}
const Filter = (props) => {
  return (<form>
    <div>
      filter shown with: <input value={props.newFilter}
      onChange={props.handleFilter}/>
    </div>
  </form>)
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNumber}>
        <div>
          name: <input value={props.newName}
          onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = (props) => {
  return (<ul>
    {props.filterPersons.map(person => 
      <Number key={person.name} name={person.name} 
        number={person.number}/>
    )}
  </ul>)
}
const Number = (props) => {
  return (
    <div>
      <li>{props.name} {props.number}</li>
    </div>
  )
}
export default App