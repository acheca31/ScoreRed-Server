const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let customers = [
  {
    "id": 1,
    "phone": 123832023,
    "firstname": "Andres",
    "lastname": "Checa",
    "subscription": true
  },
  {
    "id": 2,
    "phone": 8584738923,
    "firstname": "Dewey",
    "lastname": "Chex",
    "subscription": false
  },
  {
    "id": 3,
    "phone": 98987856,
    "firstname": "John",
    "lastname": "Smith",
    "subscription": true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/customers', (request, response) => {
  response.json(customers)
})

app.get('/api/customers/:id', (request, response) => {
    const id = Number(request.params.id)
    const customer = customers.find(customer => customer.id === id)

    if (customer) {
        response.json(customer)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/customers/:id', (request, response) => {
    const id = Number(request.params.id)
    customers = customers.filter(customer => customer.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const maxId = customers.length > 0
      ? Math.max(...customers.map(n => n.id))
      : 0
    return maxId + 1
}
  
app.post('/api/customers', (request, response) => {
    const body = request.body
  
    if (!body.phone) {
      return response.status(400).json({ 
        error: 'phone missing' 
      })
    }
  
    const customer = {
      phone: body.phone,  
      firstname: body.firstname,
      lastname: body.lastname,
      subscription: body.subscription || false,
      id: generateId(),
    }
  
    customers = customers.concat(customer)
  
    response.json(customer)
})

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})