const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const { 
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
 } = require('../controllers/productController')


/*--------- Routes -----------------------------------*/
/*----------------------------------------------------*/

// GET request for all Products
router.get('/', getProducts)
  
// GET request for a specific product
router.get('/:id', getProduct)

// POST request
router.post('/', createProduct)

// DELETE request
router.delete('/:id', deleteProduct)

// UPDATE request
router.patch('/:id', updateProduct)
/*-----------------------------------------------------*/


module.exports = router