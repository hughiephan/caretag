-- Insert record for 24-year-old Nikolai Hákon
INSERT INTO USERS (date_joined,first_name,last_name,middle_names,dob,gender_id,sex_id,blood_type_id,phone,email) VALUES ('2024-11-03 14:30:00','Nikolai','Hákon','Pio','2000-11-03',1,1,1,0455555555,'nikolaiph@example.com');
-- Insert record for 74-year-old Mary Collins
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(),'Mary', NULL, 'Collins', DATE_SUB(CURDATE(), INTERVAL 74 YEAR),2,2,1, 1234567890, 'mary.collins@example.com');
-- Insert record for 77-year-old Robert Jenkins
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'Robert', NULL, 'Jenkins', DATE_SUB(CURDATE(), INTERVAL 77 YEAR), 1, 1, 2, 9876543210, 'robert.jenkins@example.com' );
-- Insert record for 68-year-old John Miller
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'John', NULL, 'Miller', DATE_SUB(CURDATE(), INTERVAL 68 YEAR), 1, 1, 3, 5551234567, 'john.miller@example.com' );
-- Insert record for 22-year-old Alice Brown
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'Alice', NULL, 'Brown', DATE_SUB(CURDATE(), INTERVAL 22 YEAR), 2, 2,  4,  1234567890, 'alice.brown@example.com' );
-- Insert record for 45-year-old David Smit
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'David', NULL, 'Smith', DATE_SUB(CURDATE(), INTERVAL 45 YEAR), 1, 1, 5, 9876543210, 'david.smith@example.com' );
-- Insert record for 89-year-old Evelyn Johnson
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'Evelyn', NULL, 'Johnson', DATE_SUB(CURDATE(), INTERVAL 89 YEAR), 2, 2, 6, 5551234567, 'evelyn.johnson@example.com' );
-- Insert record for 34-year-old Frank White
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'Frank', NULL, 'White', DATE_SUB(CURDATE(), INTERVAL 34 YEAR), 1, 1, 7, 1239876543, 'frank.white@example.com' );
-- Insert record for 68-year-old Gloria Adams
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'Gloria', NULL, 'Adams', DATE_SUB(CURDATE(), INTERVAL 68 YEAR), 2, 2, 1, 9871234567, 'gloria.adams@example.com' );
-- Insert record for 50-year-old Henry Clark
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'Henry', NULL, 'Clark', DATE_SUB(CURDATE(), INTERVAL 50 YEAR), 1, 1, 1, 4567891230, 'henry.clark@example.com' );
-- Insert record for 29-year-old Isabel Lee
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'Isabel', NULL, 'Lee', DATE_SUB(CURDATE(), INTERVAL 29 YEAR), 2, 2, 2, 3216549870, 'isabel.lee@example.com' );
-- Insert record for 76-year-old James Walker
INSERT INTO USERS (date_joined, first_name, middle_names, last_name, dob, gender_id, sex_id, blood_type_id, phone, email) VALUES ( NOW(), 'James', NULL, 'Walker', DATE_SUB(CURDATE(), INTERVAL 76 YEAR), 1, 1, 2, 6547891234, 'james.walker@example.com' );

-- Insert 11 random addresses in Brisbane, Sydney, or Melbourne
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (1, 101, 'Queen St', 'Brisbane CBD', 'Brisbane', 1, 13, 4000);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (2, 202, 'George St', 'Spring Hill', 'Brisbane', 1, 13, 4000);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (3, 303, 'King St', 'Fortitude Valley', 'Brisbane', 1, 13, 4006);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (4, 404, 'Pitt St', 'Sydney CBD', 'Sydney', 2, 13, 2000);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (5, 505, 'Market St', 'Pyrmont', 'Sydney', 2, 13, 2009);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (6, 606, 'George St', 'The Rocks', 'Sydney', 2, 13, 2000);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (7, 707, 'Bourke St', 'Southbank', 'Melbourne', 3, 13, 3006);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (8, 808, 'Swanston St', 'Carlton', 'Melbourne', 3, 13, 3053);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (9, 909, 'Collins St', 'Docklands', 'Melbourne', 3, 13, 3008);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (10, 111, 'Elizabeth St', 'Melbourne CBD', 'Melbourne', 3, 13, 3000);
INSERT INTO USERS_ADDRESS (user_id, street_number, street_name, suburb, city,state_id, country_id, postcode) VALUES (11, 222, 'Lonsdale St', 'Melbourne CBD', 'Melbourne', 3, 13, 3000);

INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (1, '2024-11-01 08:15:00', 5, 36.6, 72, 120.80, 90);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (2, '2024-11-02 09:30:00', 6, 37.1, 75, 115.75, 85);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (3, '2024-11-03 10:45:00', 7, 36.8, 68, 122.78, 92);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (4, '2024-11-04 11:00:00', 5, 37.0, 74, 118.79, 88);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (5, '2024-11-05 12:15:00', 8, 36.9, 80, 117.81, 95);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (6, '2024-11-06 13:20:00', 6, 36.7, 76, 123.83, 94);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (7, '2024-11-07 14:35:00', 9, 37.2, 70, 116.78, 89);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (8, '2024-11-08 15:50:00', 7, 36.5, 82, 120.85, 87);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (9, '2024-11-09 16:05:00', 6, 36.9, 74, 124.82, 93);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (10, '2024-11-10 17:15:00', 5, 37.3, 77, 118.77, 91);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (1, '2024-11-11 08:15:00', 5, 36.8, 73, 119.79, 92);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (2, '2024-11-12 09:30:00', 6, 36.7, 76, 115.80, 90);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (3, '2024-11-13 10:45:00', 7, 37.1, 80, 123.82, 96);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (4, '2024-11-14 11:00:00', 5, 36.9, 78, 117.81, 88);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (5, '2024-11-15 12:15:00', 8, 36.5, 71, 118.77, 87);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (6, '2024-11-16 13:20:00', 6, 37.0, 79, 120.85, 89);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (7, '2024-11-17 14:35:00', 9, 37.2, 74, 119.78, 95);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (8, '2024-11-18 15:50:00', 7, 36.6, 69, 116.75, 91);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (9, '2024-11-19 16:05:00', 6, 37.4, 75, 123.81, 93);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (10, '2024-11-20 17:15:00', 5, 36.9, 72, 122.83, 86);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (1, '2024-11-21 08:15:00', 5, 36.5, 68, 121.80, 88);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (2, '2024-11-22 09:30:00', 6, 37.1, 77, 120.85, 92);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (3, '2024-11-23 10:45:00', 7, 36.9, 74, 118.79, 90);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (4, '2024-11-24 11:00:00', 5, 36.7, 70, 117.76, 94);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (5, '2024-11-25 12:15:00', 8, 37.0, 80, 119.81, 87);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (6, '2024-11-26 13:20:00', 6, 36.8, 73, 124.78, 85);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (7, '2024-11-27 14:35:00', 9, 37.2, 71, 118.77, 91);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (8, '2024-11-28 15:50:00', 7, 36.6, 78, 122.83, 89);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (9, '2024-11-29 16:05:00', 6, 36.5, 66, 116.75, 92);
INSERT INTO VITAL_SIGNS (user_id, date_taken, taken_by, temperature, heart_rate, blood_pressure, glucose_levels) VALUES (10, '2024-11-30 17:15:00', 5, 37.4, 82, 121.79, 95);

-- Insert 50 random entries into BMI table with calculated BMI
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (1, '2024-11-01 08:15:00', 70.5, 1.75, 70.5 / (1.75 * 1.75));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (2, '2024-11-02 09:30:00', 85.0, 1.80, 85.0 / (1.80 * 1.80));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (3, '2024-11-03 10:45:00', 62.0, 1.65, 62.0 / (1.65 * 1.65));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (4, '2024-11-04 11:00:00', 78.3, 1.70, 78.3 / (1.70 * 1.70));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (5, '2024-11-05 12:15:00', 90.0, 1.85, 90.0 / (1.85 * 1.85));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (6, '2024-11-06 13:20:00', 56.5, 1.60, 56.5 / (1.60 * 1.60));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (7, '2024-11-07 14:35:00', 68.0, 1.75, 68.0 / (1.75 * 1.75));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (8, '2024-11-08 15:50:00', 74.2, 1.72, 74.2 / (1.72 * 1.72));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (9, '2024-11-09 16:05:00', 88.1, 1.78, 88.1 / (1.78 * 1.78));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (10, '2024-11-10 17:15:00', 92.3, 1.90, 92.3 / (1.90 * 1.90));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (1, '2024-11-11 08:15:00', 60.7, 1.65, 60.7 / (1.65 * 1.65));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (2, '2024-11-12 09:30:00', 72.0, 1.68, 72.0 / (1.68 * 1.68));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (3, '2024-11-13 10:45:00', 80.5, 1.82, 80.5 / (1.82 * 1.82));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (4, '2024-11-14 11:00:00', 67.3, 1.63, 67.3 / (1.63 * 1.63));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (5, '2024-11-15 12:15:00', 59.2, 1.60, 59.2 / (1.60 * 1.60));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (6, '2024-11-16 13:20:00', 66.4, 1.70, 66.4 / (1.70 * 1.70));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (7, '2024-11-17 14:35:00', 83.2, 1.78, 83.2 / (1.78 * 1.78));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (8, '2024-11-18 15:50:00', 71.6, 1.73, 71.6 / (1.73 * 1.73));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (9, '2024-11-19 16:05:00', 76.5, 1.76, 76.5 / (1.76 * 1.76));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (10, '2024-11-20 17:15:00', 88.7, 1.80, 88.7 / (1.80 * 1.80));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (1, '2024-11-21 08:15:00', 82.0, 1.79, 82.0 / (1.79 * 1.79));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (2, '2024-11-22 09:30:00', 64.3, 1.64, 64.3 / (1.64 * 1.64));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (3, '2024-11-23 10:45:00', 90.5, 1.85, 90.5 / (1.85 * 1.85));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (4, '2024-11-24 11:00:00', 58.0, 1.60, 58.0 / (1.60 * 1.60));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (5, '2024-11-25 12:15:00', 63.7, 1.62, 63.7 / (1.62 * 1.62));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (6, '2024-11-26 13:20:00', 74.0, 1.68, 74.0 / (1.68 * 1.68));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (7, '2024-11-27 14:35:00', 82.6, 1.77, 82.6 / (1.77 * 1.77));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (8, '2024-11-28 15:50:00', 69.4, 1.74, 69.4 / (1.74 * 1.74));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (9, '2024-11-29 16:05:00', 77.1, 1.75, 77.1 / (1.75 * 1.75));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (10, '2024-11-30 17:15:00', 91.0, 1.85, 91.0 / (1.85 * 1.85));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (1, '2024-12-01 08:15:00', 79.0, 1.78, 79.0 / (1.78 * 1.78));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (2, '2024-12-02 09:30:00', 86.5, 1.83, 86.5 / (1.83 * 1.83));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (3, '2024-12-03 10:45:00', 72.3, 1.69, 72.3 / (1.69 * 1.69));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (4, '2024-12-04 11:00:00', 68.0, 1.71, 68.0 / (1.71 * 1.71));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (5, '2024-12-05 12:15:00', 75.5, 1.75, 75.5 / (1.75 * 1.75));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (6, '2024-12-06 13:20:00', 81.2, 1.80, 81.2 / (1.80 * 1.80));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (7, '2024-12-07 14:35:00', 62.5, 1.62, 62.5 / (1.62 * 1.62));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (8, '2024-12-08 15:50:00', 85.7, 1.85, 85.7 / (1.85 * 1.85));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (9, '2024-12-09 16:05:00', 70.8, 1.70, 70.8 / (1.70 * 1.70));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (10, '2024-12-10 17:15:00', 94.0, 1.90, 94.0 / (1.90 * 1.90));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (1, '2024-12-11 08:15:00', 60.0, 1.63, 60.0 / (1.63 * 1.63));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (2, '2024-12-12 09:30:00', 78.5, 1.73, 78.5 / (1.73 * 1.73));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (3, '2024-12-13 10:45:00', 82.0, 1.80, 82.0 / (1.80 * 1.80));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (4, '2024-12-14 11:00:00', 59.4, 1.58, 59.4 / (1.58 * 1.58));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (5, '2024-12-15 12:15:00', 88.5, 1.82, 88.5 / (1.82 * 1.82));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (6, '2024-12-16 13:20:00', 76.0, 1.76, 76.0 / (1.76 * 1.76));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (7, '2024-12-17 14:35:00', 65.2, 1.63, 65.2 / (1.63 * 1.63));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (8, '2024-12-18 15:50:00', 72.8, 1.68, 72.8 / (1.68 * 1.68));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (9, '2024-12-19 16:05:00', 79.0, 1.80, 79.0 / (1.80 * 1.80));
INSERT INTO BMI (user_id, date, weight, height, BMI) VALUES (10, '2024-12-20 17:15:00', 67.5, 1.65, 67.5 / (1.65 * 1.65));

-- Insert 30 random entries into MEDICATION table
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Aspirin', 'Bayer', 1, 500.0, 1, 'Used to reduce pain, fever, or inflammation.', 'Nausea, stomach pain, bleeding');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Amoxicillin', 'Pfizer', 2, 250.0, 2, 'Antibiotic for bacterial infections.', 'Diarrhea, nausea, skin rash');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Ibuprofen', 'Advil Inc.', 1, 200.0, 1, 'Non-steroidal anti-inflammatory drug for pain and inflammation.', 'Nausea, dizziness, stomach pain');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Lisinopril', 'Merck', 2, 10.0, 3, 'ACE inhibitor for high blood pressure.', 'Dizziness, cough, headache');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Metformin', 'Teva', 1, 500.0, 2, 'Oral diabetes medicine for blood sugar control.', 'Nausea, vomiting, diarrhea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Atorvastatin', 'Pfizer', 1, 20.0, 3, 'Statin for high cholesterol.', 'Muscle pain, diarrhea, nausea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Omeprazole', 'AstraZeneca', 2, 40.0, 3, 'Proton pump inhibitor for acid reflux.', 'Headache, stomach pain, nausea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Losartan', 'Teva', 2, 50.0, 1, 'Antihypertensive for high blood pressure.', 'Dizziness, muscle cramps, diarrhea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Levothyroxine', 'AbbVie', 2, 100.0, 3, 'Thyroid hormone replacement therapy.', 'Increased appetite, weight loss, sweating');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Hydrochlorothiazide', 'Sandoz', 3, 25.0, 1, 'Diuretic for high blood pressure.', 'Dizziness, headache, upset stomach');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Sertraline', 'Pfizer', 2, 50.0, 3, 'Antidepressant for major depressive disorder.', 'Dizziness, dry mouth, nausea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Prednisone', 'Mylan', 1, 20.0, 2, 'Corticosteroid for inflammatory conditions.', 'Weight gain, mood changes, increased appetite');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Gabapentin', 'Pfizer', 1, 300.0, 2, 'Anticonvulsant for nerve pain.', 'Dizziness, fatigue, dry mouth');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Clonazepam', 'Roche', 1, 0.5, 1, 'Anti-anxiety medication.', 'Drowsiness, dizziness, fatigue');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Albuterol', 'Teva', 2, 2.5, 2, 'Bronchodilator for asthma.', 'Nervousness, shaking, headache');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Simvastatin', 'Merck', 2, 20.0, 1, 'Statin for cholesterol control.', 'Muscle pain, constipation, nausea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Ciprofloxacin', 'Bayer', 2, 500.0, 2, 'Antibiotic for bacterial infections.', 'Nausea, diarrhea, dizziness');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Warfarin', 'Coumadin', 1, 5.0, 1, 'Blood thinner for clot prevention.', 'Bleeding, nausea, stomach pain');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Lorazepam', 'Wyeth', 1, 1.0, 2, 'Anti-anxiety medication.', 'Drowsiness, dizziness, weakness');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Montelukast', 'Merck', 1, 10.0, 1, 'Leukotriene inhibitor for asthma.', 'Headache, stomach pain, cough');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Tamsulosin', 'Boehringer', 1, 0.4, 1, 'Alpha-blocker for prostate conditions.', 'Dizziness, runny nose, sleepiness');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Oxycodone', 'Purdue', 2, 5.0, 1, 'Opioid for pain relief.', 'Drowsiness, constipation, nausea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Esomeprazole', 'AstraZeneca', 2, 40.0, 3, 'Proton pump inhibitor for acid reflux.', 'Headache, dry mouth, diarrhea');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Metoprolol', 'Novartis', 1, 50.0, 1, 'Beta blocker for blood pressure control.', 'Dizziness, fatigue, depression');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Fluoxetine', 'Lilly', 2, 20.0, 3, 'SSRI for depression and anxiety.', 'Nausea, insomnia, headache');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Cetirizine', 'McNeil', 2, 10.0, 3, 'Antihistamine for allergy relief.', 'Drowsiness, dry mouth, fatigue');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Furosemide', 'Sanofi', 1, 40.0, 1, 'Diuretic for edema and hypertension.', 'Frequent urination, dizziness, headache');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Amlodipine', 'Pfizer', 1, 5.0, 1, 'Calcium channel blocker for blood pressure.', 'Swelling, dizziness, fatigue');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Tramadol', 'Mylan', 2, 50.0, 1, 'Opioid for moderate to severe pain.', 'Nausea, dizziness, constipation');
INSERT INTO MEDICATION (name, manufacturer, medication_type_id, strength, unit_of_measure_id, description, side_effects) VALUES ('Doxycycline', 'Pfizer', 2, 100.0, 2, 'Antibiotic for bacterial infections.', 'Nausea, diarrhea, sun sensitivity');

-- Insert 40 random entries into ALLERGY table
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Peanut Allergy', 1, 'Swelling, hives, difficulty breathing', 'Allergic reaction to peanuts and peanut-containing products.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Shellfish Allergy', 1, 'Hives, swelling of lips and tongue, abdominal pain', 'Allergy to shellfish such as shrimp, crab, and lobster.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Pollen Allergy', 2, 'Sneezing, runny nose, itchy eyes', 'Seasonal allergy to pollen from trees, grasses, and weeds.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Dust Mite Allergy', 3, 'Coughing, itchy skin, watery eyes', 'Allergy to microscopic dust mites found in household dust.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Egg Allergy', 1, 'Rashes, swelling, nausea', 'Allergic reaction to egg proteins found in egg whites and yolks.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Milk Allergy', 1, 'Vomiting, wheezing, skin rashes', 'Allergy to proteins in cow’s milk and other dairy products.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Pet Dander Allergy', 3, 'Sneezing, itchy eyes, nasal congestion', 'Allergy to proteins found in skin, saliva, or urine of animals.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Insect Sting Allergy', 4, 'Swelling, pain, difficulty breathing', 'Severe allergic reaction to insect stings such as bees or wasps.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Wheat Allergy', 1, 'Skin rash, stomach cramps, nausea', 'Allergy to proteins in wheat and wheat-containing foods.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Soy Allergy', 1, 'Abdominal pain, diarrhea, hives', 'Allergic reaction to soy proteins, commonly found in food.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Mold Allergy', 3, 'Coughing, itchy eyes, congestion', 'Allergy to mold spores found in damp or moist environments.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Tree Nut Allergy', 1, 'Hives, swelling, anaphylaxis', 'Allergic reaction to tree nuts like almonds, walnuts, and pecans.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Latex Allergy', 4, 'Rash, itching, anaphylaxis', 'Allergy to latex, commonly found in gloves and medical supplies.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Penicillin Allergy', 2, 'Rashes, itching, swelling', 'Allergic reaction to penicillin antibiotics.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Fragrance Allergy', 3, 'Skin rash, headache, breathing issues', 'Allergy to chemicals found in perfumes and fragrances.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Sun Allergy', 2, 'Red rash, itching, blisters', 'Allergy to sunlight causing skin reactions.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Avocado Allergy', 1, 'Swelling, abdominal pain, itchy mouth', 'Allergy to avocado, often associated with latex allergies.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Banana Allergy', 1, 'Itchy throat, hives, abdominal pain', 'Allergic reaction to bananas, common in latex allergy sufferers.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Garlic Allergy', 1, 'Rashes, bloating, nausea', 'Allergy to garlic, often causing gastrointestinal symptoms.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Nickel Allergy', 4, 'Skin rash, redness, itching', 'Contact allergy to nickel, often found in jewelry and buttons.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Apple Allergy', 1, 'Itchy mouth, throat irritation, swelling', 'Allergy to apples, commonly associated with birch-pollen allergies.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Strawberry Allergy', 1, 'Hives, swelling, skin rash', 'Allergic reaction to strawberries, especially in children.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Sesame Allergy', 1, 'Hives, nausea, wheezing', 'Allergy to sesame seeds and products containing sesame.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Bee Pollen Allergy', 2, 'Sneezing, watery eyes, throat irritation', 'Allergic reaction to bee pollen, commonly found in supplements.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Chocolate Allergy', 1, 'Skin rash, headaches, digestive upset', 'Allergy to components in chocolate, including cocoa or milk.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Chicken Allergy', 1, 'Hives, nausea, breathing difficulties', 'Allergic reaction to chicken meat and related products.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Oat Allergy', 1, 'Stomach pain, itchy skin, bloating', 'Allergy to oats, often confused with gluten intolerance.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Perfume Allergy', 3, 'Headache, rash, breathing difficulties', 'Allergy to chemicals in perfumes and scented products.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Coconut Allergy', 1, 'Swelling, rash, gastrointestinal issues', 'Allergic reaction to coconut and coconut-based products.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Fish Allergy', 1, 'Hives, swelling, trouble breathing', 'Allergy to fish proteins, can be severe.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Mustard Allergy', 1, 'Rashes, hives, breathing issues', 'Allergy to mustard seeds and mustard-containing foods.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Meat Allergy', 1, 'Abdominal pain, rash, anaphylaxis', 'Allergy to red meat, can be linked to tick bites.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Sunflower Seed Allergy', 1, 'Hives, nausea, itchy mouth', 'Allergy to sunflower seeds, found in many foods and oils.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Tomato Allergy', 1, 'Itchy skin, swelling, gastrointestinal symptoms', 'Allergy to tomatoes, common in nightshade sensitivities.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Sulphite Allergy', 4, 'Hives, asthma symptoms, abdominal pain', 'Allergy to sulphites, commonly used as food preservatives.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Carrot Allergy', 1, 'Itchy mouth, stomach pain, skin rash', 'Allergy to carrots, can be linked to pollen allergies.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Yeast Allergy', 1, 'Bloating, rashes, respiratory symptoms', 'Allergy to yeast, often affecting those with other food sensitivities.');
INSERT INTO ALLERGY (allergy_name, category_id, common_symptoms, description) VALUES('Pepper Allergy', 1, 'Stomach upset, rash, itching', 'Allergy to black or white pepper, a common seasoning.');
