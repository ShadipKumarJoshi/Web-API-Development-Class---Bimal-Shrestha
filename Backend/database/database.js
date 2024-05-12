// Import database
const mongoose = require('mongoose')

// External File
// In external files are Functions (Connection)
// Make a unique function name\
// Export at end

// Function can be made by 2 types ; arrow function
// const connectDatabase = () => {
//     mongoose.connect('mongodb://localhost:27017').then(() => {
//         console.log("Database Connected!")
//     })
// }

// Conncecting to database through mongoDB atlas
// const connectDatabase = () => {
//     mongoose.connect('mongodb+srv://test:test@cluster0.jhugncu.mongodb.net/').then(() => {
//         console.log("Database Connected!")
//     })
// }

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_CLOUD).then(() => { // database connected through the dotenv for security
        console.log("Database Connected!")
    })
}

    // Exporting the function // module.exports = functionName
    module.exports = connectDatabase