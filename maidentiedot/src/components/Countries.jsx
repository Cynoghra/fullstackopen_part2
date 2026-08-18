import Country from './Country'

const Countries = ({ countries, selectedCountry, handleShowCountry }) => {

    if (selectedCountry) {
        return <Country country={selectedCountry} />
    }

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (countries.length > 1) {
        return (
            <div>
                {countries.map(country =>
                    <div key={country.name.common}>
                        {country.name.common}
                        <button style={{ marginLeft: '10px' }} onClick={() => handleShowCountry(country)}>
                            show
                        </button>
                    </div>
                )}
            </div>
        )
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    return null
}

export default Countries