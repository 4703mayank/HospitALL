USE Hospital;
CREATE TABLE vendor_register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    license_number VARCHAR(255) NOT NULL,
    products_services TEXT NOT NULL,
    billing_info TEXT NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE vendor_login (
    id INT PRIMARY KEY, -- Matches `id` from `vendor_register`
    company_name VARCHAR(255) NOT NULL,
    license_number VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES vendor_register(id)
);

DROP TABLE vendor_login;
DROP TABLE vendor_register;
Show TABLES;
SELECT * FROM vendor_register;
SELECT * FROM doctors;