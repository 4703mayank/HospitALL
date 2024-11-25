USE Hospital;
DROP TABLE doctors;
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    license VARCHAR(50) NOT NULL UNIQUE,
    experience INT NOT NULL,
    qualifications VARCHAR(255) NOT NULL,
    employment_status VARCHAR(50) NOT NULL,
    previous_employment VARCHAR(255),
    medical_council VARCHAR(100),
    board_certifications VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE doctors ADD COLUMN password VARCHAR(255);

SELECT * FROM patients;
SELECT * FROM doctors;
