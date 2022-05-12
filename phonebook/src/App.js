import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      <ul>
        {persons.map(person => 
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