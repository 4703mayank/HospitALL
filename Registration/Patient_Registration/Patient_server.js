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
        console.error('Database connection failed:', err);
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

    // Generate the password (human-readable format)
    const generatedPassword = `${first_name}@${new Date(dob).getFullYear()}`;

    // Insert into `patients` table (store plaintext password)
    const patientQuery = `
        INSERT INTO patients (first_name, middle_name, last_name, father_name, mother_name, email, phone, aadhar, dob, age, gender, address, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        patientQuery,
        [first_name, middle_name, last_name, father_name, mother_name, email, phone, aadhar, dob, age, gender, address, generatedPassword],  // Store plaintext password
        (err, result) => {
            if (err) {
                console.error('Error inserting into patients table:', err);
                return res.status(500).json({ message: 'Error saving patient details.' });
            }

            const patientId = result.insertId; // Get the auto-incremented patient ID

            // Insert into `login` table (store plaintext password here)
            const loginQuery = `
                INSERT INTO login (patient_id, phone, name, password)
                VALUES (?, ?, ?, ?)`;

            db.query(
                loginQuery,
                [patientId, phone, first_name, generatedPassword],  // Use the plaintext password here
                (err) => {
                    if (err) {
                        console.error('Error inserting into login table:', err);
                        return res.status(500).json({ message: 'Error saving login details.' });
                    }

                    res.status(200).json({
                        message: 'User registered successfully!',
                        loginCredentials: {
                            phone,
                            generatedPassword // Include this in the response
                        }
                    });
                }
            );
        }
    );
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
