const Customer = require('../models/customer')
const mongoose = require('mongoose')

// get all Customers
const getCustomers = async (request, response) => {
    console.log('getting customers')
    const customers = await Customer.find({})

    response.status(200).json(customers)
}

// get Customer by id
const getCustomer = async (request, response, next) => {
    const { id } = request.params
    
    // check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such customer'})
    }

    console.log('getting customer with id: ', id)
    const customer = await Customer.findById(id)

    if (!customer) {
        return response.status(404).json({error: 'No such customer'})
    }

    response.status(200).json(customer)
}

// create a new Customer
const createCustomer = async (request, response, next) => {
    const { phone, firstname, lastname, subscription } = request.body
    console.log('creating new customer')
    try {
        const customer = await Customer.create({ phone, firstname, lastname, subscription })
        response.status(200).json(customer)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}


// delete a Customer
const deleteCustomer = async (request, response) => {
    const { id } = request.params
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such customer'})
    }

    console.log('deleting customer with id: ', id)
    const customer = await Customer.findByIdAndDelete(id)

    if (!customer) {
        return response.status(400).json({error: 'No such customer'})
    }

    response.status(200).json(customer)
}

// update a Customer
const updateCustomer = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such customer'})
    }

    console.log('updating customer with id: ', id)
    const customer = await Customer.findByIdAndUpdate(id, {
        ...request.body
    })

    if (!customer) {
        return response.status(400).json({error: 'No such customer'})
    }

    response.status(200).json(customer)
}

module.exports = { 
    getCustomers,
    getCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer
}