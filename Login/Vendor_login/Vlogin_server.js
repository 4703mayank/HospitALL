const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4703@Mayank',
    database: 'Hospital',
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

// Vendor login route
app.post('/vendor-login', async (req, res) => {
    const { username, password } = req.body;  // username = license number, password = entered password

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Both fields are required' });
    }

    // Query to get vendor details based on license number (username)
    const sql = `SELECT * FROM vendor_login WHERE license_number = ?`;
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.error('Error fetching vendor data:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (result.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid license number' });
        }

        // Compare the entered password with the hashed password from the database
        try {
            const isMatch = await bcrypt.compare(password, result[0].password);

            if (isMatch) {
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                res.status(400).json({ success: false, message: 'Incorrect password' });
            }
        } catch (error) {
            console.error('Error comparing password:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
