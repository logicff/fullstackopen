const Person = (props) => {
  const person = props.person
  const deletePerson = props.deletePerson
  return (
    <div>
      {person.name}: {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = (props) => {
  const persons = props.persons
  const deletePersonOf = props.deletePersonOf

  if (persons.length === 0) {
    return <p>No persons found</p>
  }
  return (
    <div>
      {persons.map(person => (
        <Person
          key={person.name}
          person={person}
          deletePerson={() => {
            if (window.confirm(`Delete ${person.name}?`)) deletePersonOf(person.id)
          }}
        />
      ))}
    </div>
  )
}

export default Persons