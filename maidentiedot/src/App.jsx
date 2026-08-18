import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

// tehtävät 2.18-2.20 tehty, api testaus tehdään kun api-avain aktiivinen. Api avain on tallennettu .env tiedostoon.
const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
    setFilter(country.name.common)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries.filter(country =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )}
        selectedCountry={selectedCountry}
        handleShowCountry={handleShowCountry}
      />
    </div>
  )
}

export default App