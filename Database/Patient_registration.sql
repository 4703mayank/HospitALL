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