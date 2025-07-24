import Weather from './Weather'

const Country = (props) => {
    const country = props.country
    const setShowCountry = props.setShowCountry
    return (
        <div>
            {country.name.common || country.name.official}
            <button onClick={() => setShowCountry(country)}>Show</button>
        </div>
    )
}

const CountryDetail = (props) => {
    const country = props.country
    return (
        <div>
            <h2>{country.name.common || country.name.official}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>

            <img
                src={country.flags.png}
                alt={country.flags.alt}
                width="200"
            />

            <Weather city={Array.isArray(country.capital)? country.capital[0] : country.capital} />
        </div>
    )
}

const Countries = (props) => {
    const countries = props.countries
    const showCountry = props.showCountry
    const setShowCountry = props.setShowCountry

    if (countries.length === 0) {
        return <p>No countries found</p>
    }
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (showCountry) {
        return <CountryDetail country={showCountry} />
    }

    return (
        <div>
            {countries.map(country => (
                <Country key={country.name.common}
                    country={country} setShowCountry={setShowCountry} />
            ))}
        </div>
    )
}

export default Countries