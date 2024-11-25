const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4703@Mayank', // Replace with your actual MySQL password
    database: 'Hospital' // Replace with your actual database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both mobile number and password.' });
    }

    // Query to get user details based on mobile number
    const query = 'SELECT * FROM patients WHERE phone = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Database error during login.' });
        }

        console.log("Query Results: ", results); // Debug: Log the results

        if (results.length === 0) {
            return res.status(400).json({ message: 'No user found with this mobile number.' });
        }

        const user = results[0];

        // Generate the expected password
        const yearOfBirth = new Date(user.dob).getFullYear();
        const expectedPassword = `${user.first_name}@${yearOfBirth}`;

        // Check if the password matches
        if (password !== expectedPassword) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // Success
        res.status(200).json({ message: 'Login successful', user: user });
    });
});

// Start the server
const PORT = 3000; // You can change the port if necessary
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
