import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryService from './services/countries'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [filtername, setFiltername] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    countryService.getAll().then(initialCountries => {
      console.log('promise fulfilled')
      setCountries(initialCountries)
    })
  }, [])

  const filteredCountries = filtername ? countries.filter(country => 
    country.name.common.toLowerCase().includes(filtername.toLowerCase())
  ) : countries

  // 原来此处的代码 if (filteredCountries.length === 1) setShowCountry(filteredCountries[0])，
  // 原来此处的代码会导致无限循环，因为 setShowCountry 会导致组件重新渲染，而组件重新渲染会导致原来的代码再次执行，
  // 即当 filteredCountries.length === 1 时执行 setShowCountry ，然后组件重新渲染，
  // 但组件重新渲染时 filteredCountries.length === 1 仍然成立，然后又执行 setShowCountry ，然后组件重新渲染，无限循环。

  // 而现在的代码只有在 filteredCountries 变化时才会执行 setShowCountry ，
  // 重新渲染时， filteredCountries 相当于没有变化，不会循环执行 setShowCountry 。
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setShowCountry(filteredCountries[0]);
    }
  }, [filteredCountries]);

  return (
    <>
      <Filter setFiltername={setFiltername} setShowCountry={setShowCountry} />
      <Countries countries={filteredCountries} showCountry={showCountry} setShowCountry={setShowCountry} />
    </>
  )
}

export default App
