import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filterPersons, setNewFilterPersons] = useState(persons)

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
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <form>
        <div>
          filter shown with: <input value={newFilter}
          onChange={handleFilter}/>
        </div>
      </form>
      <ul>
        {filterPersons.map(person => 
          <Number key={person.name} name={person.name} 
            number={person.number}/>
        )}
      </ul>
    </div>
  )
}

const Number = (props) => {
  return (
    <div>
      <li>{props.name} {props.number}</li>
    </div>
  )
}
export default App