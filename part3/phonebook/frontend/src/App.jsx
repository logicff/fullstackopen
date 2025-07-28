import { useState, useEffect } from 'react'
import './App.css'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notifications from './components/Notifications'

// 说明
// Persons 组件的 props 使用 persons[i].name 和 persons[i].number, 以及 deletePersonOf
// PersonForm 组件的 props 使用 persons 和 setPersons，使用了 persons[i].name, persons[i].number, persons[i].id
// Filter 组件的 props 使用 filtername 和 setFiltername

function App() {
  const [persons, setPersons] = useState([])
  const [filtername, setFiltername] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])

  const deletePersonOf = (id) => {
    personService.deleteOne(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    }).catch(err => {
      alert(`delete from phonebook failed`)
    })
  }
  
  const filteredPersons = filtername ? persons.filter(person => 
    person.name.toLowerCase().includes(filtername.toLowerCase())
  ) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications notification={notification} />
      <Filter filtername={filtername} setFiltername={setFiltername} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePersonOf={deletePersonOf} />
    </div>
  )
}

export default App
