import { useState, useEffect } from 'react'
import Filter from './components/Filter'
// ei tarvitse Personia tuoda tänne, koska Display hoitaa sen
import Display from './components/Display'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  // Testi aineisto, joka sisältää muutaman henkilön nimen ja puhelinnumeron
  // 2.11 muutettu axios hakuun
  // 2.12-2.15 tehty. Synkronointi palvelimelle. Palvelut lisätty services kansioon.
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
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

    const existingPerson = persons.find(person => person.name === newName)

    const personObject = {
      name: newName,
      number: newNumber
    }

    // Tarkistetaan, onko nimi jo listassa, jos on, kysytään käyttäjältä, haluaako hän korvata vanhan numeron uudella
    if (existingPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmReplace) {
        const changedPerson = {
          ...existingPerson,
          number: newNumber
        }

        personService
          .update(existingPerson.id, changedPerson)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id
                  ? person
                  : response.data
              )
            )

            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
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
      <Display persons={personsToShow} removePerson={removePerson} />
    </div>
  )

}

export default App