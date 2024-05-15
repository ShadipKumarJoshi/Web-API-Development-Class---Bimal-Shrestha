// Imports
const router = require('express').Router();
const userController = require('../controllers/userControllers')

// Creating user registration route.
// 4 method; POST, GET, PUT, DELETE

//  controller(export)-> Routes (import)-> use ->index.js 
// register routes
router.post('/create', userController.createUser)

// login routes
router.post('/login', userController.loginUser)

// Exporting the routes
module.exports = router

