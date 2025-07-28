import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = (props) => {
    // 利用JS传递引用的特性
    const persons = props.persons
    const setPersons = props.setPersons
    const setNotification = props.setNotification
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const updatePerson = (id, personObject) => {
        personService.update(id, personObject).then(returnedPerson => {
            setPersons(persons.map(p => p.id === id ? returnedPerson : p))
        }).catch(err => {
            setNotification({
                type: 'error',
                message: `Information of ${personObject.name} has already been removed from server`,
            })
            setTimeout(() => setNotification(null), 5000)
            setPersons(persons.filter(p => p.id !== id))
        })
    }

    const addPerson = (event) => {
        event.preventDefault()
        // 验证输入
        if (!newName || !newNumber) {
            alert('Please fill in both name and number')
            return
        }
        // 检查名字是否已存在
        const existingPerson = persons.find(p => p.name === newName)
        if (existingPerson) {
            if (window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )) {
                updatePerson(existingPerson.id, {
                    ...existingPerson, number: newNumber
                })
            }
            setNewName('')
            setNewNumber('')
            return
        }
        // 添加新名字
        const personObject = {
            name: newName,
            number: newNumber,
            id: `${persons.length + 1}`,
        }
        personService.create(personObject).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNotification({
                type: 'success',
                message: `Added ${newName}`,
            })
            setTimeout(() => setNotification(null), 5000)
        }).catch(error => {
            setNotification({
                type: 'error',
                message: `${error.response.data.error}`,
            })
            console.log(error.response.data.error)
            setTimeout(() => setNotification(null), 5000)
        }).finally(() => {
            setNewName('')
            setNewNumber('')
        })
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handleNameChange} required /></div>
            <div>number: <input value={newNumber} onChange={handleNumberChange} required /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm