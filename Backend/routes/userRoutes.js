// Imports
const router = require('express').Router();
const userController = require('../controllers/userControllers')

// Creating user registration route
// 4 method; POST, GET, PUT, DELETE

//  controller(export)-> Routes (import)-> use ->index.js 
router.post('/create', userController.createUser)

// Exporting the routes
module.exports = router

