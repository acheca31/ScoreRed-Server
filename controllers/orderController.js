const Order = require('../models/order')
const mongoose = require('mongoose')

// get all Orders
const getOrders = async (request, response) => {
    console.log('getting orders')
    const orders = await Order.find({})

    response.status(200).json(orders)
}

// get Order by id
const getOrder = async (request, response, next) => {
    const { id } = request.params
    
    // check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such order'})
    }

    console.log('getting order with id: ', id)
    const order = await Order.findById(id)

    if (!order) {
        return response.status(404).json({error: 'No such order'})
    }

    response.status(200).json(order)
}

// create a new Order
const createOrder = async (request, response, next) => {
    const { product, quantity } = request.body
    console.log('creating new order')
    try {
        const order = await Order.create({ product, quantity })
        response.status(200).json(order)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}


// delete a Order
const deleteOrder = async (request, response) => {
    const { id } = request.params
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such order'})
    }

    console.log('deleting order with id: ', id)
    const order = await Order.findByIdAndDelete(id)

    if (!order) {
        return response.status(400).json({error: 'No such order'})
    }

    response.status(200).json(order)
}

// update a Order
const updateOrder = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such order'})
    }

    console.log('updating order with id: ', id)
    const order = await Order.findByIdAndUpdate(id, {
        ...request.body
    })

    if (!order) {
        return response.status(400).json({error: 'No such order'})
    }

    response.status(200).json(order)
}

module.exports = { 
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
}