import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
// ei tarvitse Personia tuoda tänne, koska Display hoitaa sen
import Display from './components/Display'
import PersonForm from './components/PersonForm'

const App = () => {
  // Testi aineisto, joka sisältää muutaman henkilön nimen ja puhelinnumeron
  // 2.11 muutettu axios hakuun
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // Tilat uuden henkilön nimen ja puhelinnumeron tallentamiseen sekä suodattimen hallintaan
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Tarkistetaan, onko nimi jo listassa some-metodilla
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Suodatetaan henkilöt filterin perusteella
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Display persons={personsToShow} />
    </div>
  )

}

export default App