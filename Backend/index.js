//run in the  terminal by using: node <filename>

// console.log("Welcome to NODE!") 

// index.js is main server point/ main file / main entry point 
// first process : node init  -> importing package(express) by require

//Importing pacakages
const express = require('express'); // import by using require - express
// const mongoose = require('mongoose'); no need anymore
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');
const { options } = require('./routes/userRoutes');
const cors = require('cors');

// Creating an express app
const app = express();

// Configure Cors Policy
const CorsOptions = {
    origin : true,
    credentials : true,
    optionSuccessStatus : 200
}
app.use(cors(CorsOptions))

// Express Json Config
app.use(express.json())

// dotenv Configuration
dotenv.config()

// Connecting to database (locally) THIS code is in database.js
// mongoose.connect('mongodb://localhost:27017').then(()=>{
//     console.log("Database Connected!")
// })

// Conncecting to database through mongoDB atlas
// mongoose.connect('mongodb+srv://test:test@cluster0.jhugncu.mongodb.net/').then(()=>{
//     console.log("Database Connected!")
// })

// Connecting to database
connectDatabase()

// Defining the port : normally backend code is run between 5000 to 6000 port
// const PORT = 5000;
const PORT = process.env.PORT; // port connected through dotenv for security

/// CODE AREA

// Making a test endpoint
// Endpoints : 4 types : POST, GET, PUT, DELETE needs path and function
// path , function

app.get('/test', (req, res)=>{
    res.send("Test API is working!...")
})

// http://localhost:5000/test // api url generated

// Configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'))

app.use('/api/user', require('./routes/productRoutes'))

//http://localhost:5000/api/user/create

// Starting the server using arrow function ()=>{} // listen in above mentioned port, arrow function => with {}
app.listen(PORT, ()=>{
    // console.log(S'erver is running on PORT 5000!')
    console.log(`Server running on PORT ${PORT}!`) // making dynamic using `` instead of "" // stop by Ctrl+C
    // npm install nodemon to install package which is installed in dependencies in package.json
    //   "scripts": {
    // "start": "nodemon index.js", // run by npm start
    // "test": "echo \"Error: no test specified\" && exit 1" // for restating any edits in index.js 

}) 


