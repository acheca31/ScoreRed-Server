require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const customerRoutes = require('./routes/customerRoutes')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')

const Customer = require('./models/customer')
const Order = require('./models/order')
const Product = require('./models/product')


// Initial Middleware
app.use(express.static('dist'))
app.use(express.json()) 
app.use(cors())


// Routes
app.use("/api/customers", customerRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/products", productRoutes)


// Error handling for unknown endpoint
const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})