const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MySQL connection pool
const connection = mysql.createPool({
    host: '127.0.0.1', // Your MySQL host
    user: 'root',
    password: '4703@Mayank',
    database: 'Hospital',
    connectionLimit: 10
});

// Test the connection
connection.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database with thread ID:', conn.threadId);
    conn.release();
});

// Endpoint to handle doctor registration
app.post('/registerDoctor', (req, res) => {
    const {
        fullName, dob, gender, phone, email, address,
        specialization, license, experience, qualifications,
        employmentStatus, previousEmployment, 
        medicalCouncil, boardCertifications
    } = req.body;

    // Generate password in the format "fullName@yearOfBirth"
    const yearOfBirth = new Date(dob).getFullYear();
    const generatedPassword = `${fullName.split(' ')[0]}@${yearOfBirth}`;

    const query = `
        INSERT INTO doctors (full_name, dob, gender, phone, email, address,
        specialization, license, experience, qualifications,
        employment_status, previous_employment, 
        medical_council, board_certifications, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        fullName, dob, gender, phone, email, address,
        specialization, license, experience, qualifications,
        employmentStatus, previousEmployment,
        medicalCouncil, boardCertifications, generatedPassword
    ];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting doctor data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.status(200).json({ message: 'Doctor registered successfully with auto-generated password!' });
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3000`);
});
