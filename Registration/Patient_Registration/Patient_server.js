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
    password: '4703@Mayank',
    database: 'Hospital'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Registration route
app.post('/register', (req, res) => {
    const {
        first_name,
        middle_name,
        last_name,
        father_name,
        mother_name,
        email,
        phone,
        aadhar,
        dob,
        age,
        gender,
        address
    } = req.body;

    // Generate password
    const yearOfBirth = new Date(dob).getFullYear();
    const generatedPassword = `${first_name}@${yearOfBirth}`;

    const query = `INSERT INTO patients (first_name, middle_name, last_name, father_name, mother_name, email, phone, aadhar, dob, age, gender, address, password)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        query,
        [first_name, middle_name, last_name, father_name, mother_name, email, phone, aadhar, dob, age, gender, address, generatedPassword],
        (err, result) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ message: 'Error saving registration details.' });
            }
            res.status(200).json({ message: 'User registered successfully with auto-generated password!' });
        }
    );
});

    
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
