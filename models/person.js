const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//const url = process.env.MONGODB_URI
const url = `mongodb+srv://fullstackopen:fullstackopen123@cluster0.anov5.mongodb.net/phonebook-data?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { 
    type: String, 
    required: true,
    minlength: 8, 
    validate: [(value) => {
      let pattern = /^\d+$/
      return pattern.test(value)
    }, 'number can only contain digits'] 
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)