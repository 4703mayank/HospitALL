const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');  // Import bcryptjs for hashing passwords
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

// Vendor registration route
// Vendor registration route
app.post('/register-vendor', async (req, res) => {
    const { company_name, contact_person, license_number, products_services, billing_info } = req.body;

    if (!company_name || !contact_person || !license_number || !products_services || !billing_info) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Generate password: first word of company name + "@" + license number
    const password = `${company_name.split(' ')[0]}@${license_number}`;

    try {
        // Hash the generated password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds (10)

        // Insert vendor details into `vendor_register` table
        const sqlRegister = `INSERT INTO vendor_register (company_name, contact_person, license_number, products_services, billing_info, password) 
                             VALUES (?, ?, ?, ?, ?, ?)`;
        const valuesRegister = [company_name, contact_person, license_number, products_services, billing_info, password]; // Save plain password for registration

        db.query(sqlRegister, valuesRegister, (err, result) => {
            if (err) {
                console.error('Error inserting vendor data:', err);
                return res.status(500).json({ success: false, message: 'Failed to register vendor' });
            }

            // Insert the hashed password into `vendor_login` table
            const sqlLogin = `INSERT INTO vendor_login (id, company_name, license_number, password) 
                              VALUES (?, ?, ?, ?)`;
            const valuesLogin = [result.insertId, company_name, license_number, hashedPassword]; // Save the hashed password

            db.query(sqlLogin, valuesLogin, (err) => {
                if (err) {
                    console.error('Error inserting login data:', err);
                    return res.status(500).json({ success: false, message: 'Failed to save login details' });
                }

                res.status(200).json({ success: true, message: 'Vendor registered successfully' });
            });
        });

    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
