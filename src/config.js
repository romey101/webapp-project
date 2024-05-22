// Import the Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Connect to the MongoDB database named 'test' on the local machine
const connect = mongoose.connect("mongodb://localhost:27017/test")

// Handle successful and unsuccessful database connection attempts
connect.then(() => {
    console.log("Database connected successfully");
}).catch(() => {
    console.log("Database not connected");
});

// Define the schema for the user collection
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // The name field is required
    },
    password: {
        type: String,
        required: true // The password field is required
    }
});

// Create the 'users' collection using the loginSchema
const collection = mongoose.model("users", loginSchema);

// Export the collection to be used in other parts of the application
module.exports = collection;