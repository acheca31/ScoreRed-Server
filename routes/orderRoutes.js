const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const { 
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
 } = require('../controllers/orderController')


/*--------- Routes -----------------------------------*/
/*----------------------------------------------------*/

// GET request for all Orders
router.get('/', getOrders)
  
// GET request for a specific order
router.get('/:id', getOrder)

// POST request
router.post('/', createOrder)

// DELETE request
router.delete('/:id', deleteOrder)

// UPDATE request
router.patch('/:id', updateOrder)
/*-----------------------------------------------------*/


module.exports = router