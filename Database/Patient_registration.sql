CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    aadhar VARCHAR(12) UNIQUE,
    dob DATE,
    age INT,
    gender VARCHAR(10),
    address VARCHAR(255),
    password VARCHAR(255)
);

Select * From patients;

truncate patients;

DROP TABLE patients;
SELECT * FROM vendor_login;
SHOW TABLES;

DELETE FROM patients WHERE id = 10;
DELETE FROM patients WHERE id = 11;
DELETE FROM patients WHERE id = 12;
DELETE FROM patients WHERE id = 13;
 
Use Hospital;