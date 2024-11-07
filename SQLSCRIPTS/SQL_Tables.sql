-- Table: PERMISSIONS
CREATE TABLE PERMISSIONS (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    field VARCHAR(255)
);

-- Table: USERS
CREATE TABLE GENDER (
    gender_id INT AUTO_INCREMENT PRIMARY KEY,
    gender_name VARCHAR(255)
);

-- Table: USERS
CREATE TABLE SEX (
    sex_id INT AUTO_INCREMENT PRIMARY KEY,
    sex_name VARCHAR(255)
);

-- Table: USERS
CREATE TABLE BLOOD_TYPE (
    blood_type_id INT AUTO_INCREMENT PRIMARY KEY,
    blood_type_name VARCHAR(255)
);

-- Table: USERS
CREATE TABLE USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    date_joined DATETIME,
    first_name VARCHAR(255),
    middle_names VARCHAR(255),
    last_name VARCHAR(255),
    dob DATE,
    gender_id INT,
    sex_id INT,
    blood_type_id INT,
    phone INT,
    email VARCHAR(255),
    FOREIGN KEY (gender_id) REFERENCES GENDER(gender_id),
    FOREIGN KEY (sex_id) REFERENCES SEX(sex_id),
    FOREIGN KEY (blood_type_id) REFERENCES BLOOD_TYPE(blood_type_id)
);



-- Table: USERS_PERMISSIONS
CREATE TABLE USERS_ADDRESS (
    user_id INT,
    address_id INT  AUTO_INCREMENT PRIMARY KEY,
    street_number INT,
    street_name VARCHAR(255),
    suburb VARCHAR(255),
    city VARCHAR(255),
    state_id INT,
    country_id INT,
    postcode INT,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id),
    FOREIGN KEY (state_id) REFERENCES STATE(state_id)
);

-- Table: USERS_PERMISSIONS
CREATE TABLE COUNTRY (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(255),
    country_code VARCHAR(5)
);

-- Table: USERS_PERMISSIONS
CREATE TABLE STATE (
    state_id INT AUTO_INCREMENT PRIMARY KEY,
    state_name VARCHAR(255),
    state_code VARCHAR(5),
    country_id INT,
    FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id)
);


-- Table: USERS_PERMISSIONS
CREATE TABLE USERS_PERMISSIONS (
    user_id INT,
    permission_id INT,
    PRIMARY KEY (user_id, permission_id),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (permission_id) REFERENCES PERMISSIONS(permission_id)
);

-- Table: USERS_CONTACT
CREATE TABLE USERS_CONTACT (
    user_id INT,
    contact_id INT,
    is_primary BOOLEAN,
    relationship VARCHAR(255),
    PRIMARY KEY (user_id, contact_id),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- Table: VITAL_SIGNS
CREATE TABLE VITAL_SIGNS (
    user_id INT,
    date_taken DATETIME,
    taken_by INT,
    temperature FLOAT,
    heart_rate FLOAT,
    blood_pressure FLOAT,
    glucose_levels FLOAT,
    PRIMARY KEY (user_id, date_taken),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- Table: BMI
CREATE TABLE BMI (
    user_id INT,
    date DATETIME,
    weight FLOAT,
    height FLOAT,
    BMI FLOAT,
    PRIMARY KEY (user_id, date),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- Table: ALERT
CREATE TABLE ALERT (
    alert_id INT PRIMARY KEY,
    user_id INT,
    date_created DATETIME,
    date_set DATETIME,
    frequency ENUM('daily', 'weekly', 'monthly'),
    is_recurring BOOLEAN,
    title VARCHAR(255),
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- Table: DOCTOR
CREATE TABLE DOCTOR (
    user_id INT PRIMARY KEY,
    specialization VARCHAR(255),
    license_number VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- Table: PRESCRIPTION
CREATE TABLE PRESCRIPTION (
    prescription_id INT PRIMARY KEY,
    user_id INT,
    doctor_id INT,
    medication_id INT,
    date DATE,
    dosage FLOAT,
    frequency ENUM('daily', 'weekly', 'monthly'),
    refills INT,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (doctor_id) REFERENCES DOCTOR(user_id),
    FOREIGN KEY (medication_id) REFERENCES MEDICATION(medication_id)
);

-- Table: MEDICATION
CREATE TABLE MEDICATION (
    medication_id INT PRIMARY KEY,
    name VARCHAR(255),
    manufacturer VARCHAR(255),
    form ENUM('tablet', 'capsule', 'liquid', 'injection'),
    strength FLOAT,
    unit_of_measure ENUM('mg', 'ml', 'g'),
    description TEXT,
    side_effects TEXT
);

-- Table: ADMINISTERED
CREATE TABLE ADMINISTERED (
    administered_id INT PRIMARY KEY,
    medication_id INT,
    user_id INT,
    date_administered DATE,
    end_date DATE,
    dosage FLOAT,
    effectiveness ENUM('low', 'medium', 'high'),
    side_effects TEXT,
    FOREIGN KEY (medication_id) REFERENCES MEDICATION(medication_id),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- Table: USERS_ALLERGY
CREATE TABLE USERS_ALLERGY (
    user_id INT,
    allergy_id INT,
    symptoms VARCHAR(255),
    severity ENUM('mild', 'moderate', 'severe'),
    date_diagnosed DATE,
    notes TEXT,
    PRIMARY KEY (user_id, allergy_id),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (allergy_id) REFERENCES ALLERGY(allergy_id)
);

-- Table: ALLERGY
CREATE TABLE ALLERGY (
    allergy_id INT PRIMARY KEY,
    allergy_name VARCHAR(255),
    category ENUM('food', 'environment', 'medication', 'other'),
    common_symptoms TEXT,
    description TEXT
);

-- Table: ALLERGY_TREATMENT
CREATE TABLE ALLERGY_TREATMENT (
    allergy_id INT,
    administered_id INT,
    PRIMARY KEY (allergy_id, administered_id),
    FOREIGN KEY (allergy_id) REFERENCES ALLERGY(allergy_id),
    FOREIGN KEY (administered_id) REFERENCES ADMINISTERED(administered_id)
);

