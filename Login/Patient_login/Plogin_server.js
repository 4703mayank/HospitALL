const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For secure password comparison

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
        console.error('Database connection failed:', err);
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
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Database error during login.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'No user found with this mobile number.' });
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // Login successful
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                email: user.email
            }
        });
    });
});

// Start the server
const PORT = 3001; // You can change the port if necessary
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
