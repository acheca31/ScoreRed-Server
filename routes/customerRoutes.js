const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')
const { 
    getCustomers,
    getCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer
 } = require('../controllers/customerController')


/*--------- Routes -----------------------------------*/
/*----------------------------------------------------*/

// GET request for all Customers
router.get('/', getCustomers)
  
// GET request for a specific customer
router.get('/:id', getCustomer)

// POST request
router.post('/', createCustomer)

// DELETE request
router.delete('/:id', deleteCustomer)

// UPDATE request
router.patch('/:id', updateCustomer)
/*-----------------------------------------------------*/


module.exports = router