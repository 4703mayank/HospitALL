USE Hospital;

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);
SELECT * FROM login;

DESCRIBE login;

ALTER TABLE login DROP COLUMN name;

 DROP TABLE login;