const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://seeklavender:${password}@cluster0.3aqseq4.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
      process.exit(0)
    })
} else if (process.argv.length === 5) {
  const pname = process.argv[3]
  const pnumber = process.argv[4]

  const person = new Person({
    name: pname,
    number: pnumber,
  })

  person.save().then(() => {
    console.log(`added ${pname} number ${pnumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Please use command-line like:')
  console.log('add entry: node mongo.js yourpassword "Name" Number')
  console.log('display entry: node mongo.js yourpassword')
  mongoose.connection.close()
}
