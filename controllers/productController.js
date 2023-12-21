const Product = require('../models/product')
const mongoose = require('mongoose')

// get all Products
const getProducts = async (request, response) => {
    console.log('getting products')
    const products = await Product.find({})

    response.status(200).json(products)
}

// get Product by id
const getProduct = async (request, response, next) => {
    const { id } = request.params
    
    // check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such product'})
    }

    console.log('getting product with id: ', id)
    const product = await Product.findById(id)

    if (!product) {
        return response.status(404).json({error: 'No such product'})
    }

    response.status(200).json(product)
}

// create a new Product
const createProduct = async (request, response, next) => {
    const { product, quantity } = request.body
    console.log('creating new product')
    try {
        const product = await Product.create({ product, quantity })
        response.status(200).json(product)
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
}


// delete a Product
const deleteProduct = async (request, response) => {
    const { id } = request.params
    

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such product'})
    }

    console.log('deleting product with id: ', id)
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
        return response.status(400).json({error: 'No such product'})
    }

    response.status(200).json(product)
}

// update a Product
const updateProduct = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such product'})
    }

    console.log('updating product with id: ', id)
    const product = await Product.findByIdAndUpdate(id, {
        ...request.body
    })

    if (!product) {
        return response.status(400).json({error: 'No such product'})
    }

    response.status(200).json(product)
}

module.exports = { 
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}