// Import required modules
const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config"); // Import the collection from config.js

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the view engine to EJS 
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route to render the login page
app.get("/", (req, res) => {
    res.render("login");
});

// Route to render the signup page
app.get("/signup", (req, res) => {
    res.render("signup");
});

const saltRounds = 10; // Number of salt rounds for hashing passwords

// Signup route to handle user registration
app.post("/signup", async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;

        // Check if the username already exists
        const existingUser = await collection.findOne({ name });

        if (existingUser) {
            return res.send("User already exists with this username. Please choose a different username.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const newUser = new collection({
            name,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        return res.redirect('/');
    } catch (error) {
        // Log and respond with an error message
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Login route to handle user authentication
app.post("/login", async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;

        // Find the user by username
        const user = await collection.findOne({ name });

        if (!user) {
            // Respond with an error if the user is not found
            return res.status(401).send("User not found. Please check your username and try again.");
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            // Respond with an error if the password is incorrect
            return res.status(401).send("Incorrect password. Please try again.");
        }

        // Redirect to home page on successful login
        return res.redirect('/home.html');
    } catch (error) {
        // Log and respond with an error message
        console.error("Error during login:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// Start the server on port 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
