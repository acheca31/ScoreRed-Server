const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://acheca31:${password}@scorered-cluster0.x0rsxx9.mongodb.net/customerApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const customerSchema = new mongoose.Schema({
  phone: Number,
  firstname: String,
  lastname: String,
  subscription: Boolean,
})

const Customer = mongoose.model('Customer', customerSchema)

Customer.find({}).then(result => {
    result.forEach(customer => {
      console.log(customer)
    })
    mongoose.connection.close()
  })

