-- Table: GENDER
INSERT INTO GENDER (gender_name) VALUES ('Male');
INSERT INTO GENDER (gender_name) VALUES ('Female');

-- Table: SEX
INSERT INTO SEX (sex_name) VALUES ('Male');
INSERT INTO SEX (sex_name) VALUES ('Female');

-- Table: BLOOD_TYPE
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('O+');
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('O-');
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('A+');
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('A-');
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('B+');
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('B-');
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('AB+');
INSERT INTO BLOOD_TYPE (blood_type_name) VALUES ('AB-');

-- Table: MEDICATION_TYPE
INSERT INTO MEDICATION_TYPE (name) VALUES ('Tablet');
INSERT INTO MEDICATION_TYPE (name) VALUES ('Capsule');
INSERT INTO MEDICATION_TYPE (name) VALUES ('Liquid');
INSERT INTO MEDICATION_TYPE (name) VALUES ('Injection');

-- Table: UNIT_OF_MEASURE
INSERT INTO UNIT_OF_MEASURE (name) VALUES ('mg');
INSERT INTO UNIT_OF_MEASURE (name) VALUES ('ml');
INSERT INTO UNIT_OF_MEASURE (name) VALUES ('g');

-- Table: SEVERITY
INSERT INTO SEVERITY (name) VALUES ('Low');
INSERT INTO SEVERITY (name) VALUES ('Medium');
INSERT INTO SEVERITY (name) VALUES ('High');

-- Table: EFFECTIVENESS
INSERT INTO EFFECTIVENESS (name) VALUES ('Low');
INSERT INTO EFFECTIVENESS (name) VALUES ('Medium');
INSERT INTO EFFECTIVENESS (name) VALUES ('High');

-- Table: FREQUENCY
INSERT INTO FREQUENCY (name) VALUES ('Daily');
INSERT INTO FREQUENCY (name) VALUES ('Weekly');
INSERT INTO FREQUENCY (name) VALUES ('Monthly');

-- Table: ALLERGY_CATEGORY
INSERT INTO ALLERGY_CATEGORY (name) VALUES ('Food');
INSERT INTO ALLERGY_CATEGORY (name) VALUES ('Environment');
INSERT INTO ALLERGY_CATEGORY (name) VALUES ('Medication');
INSERT INTO ALLERGY_CATEGORY (name) VALUES ('Other');


-- Table: COUNTRY
INSERT INTO COUNTRY(country_name, country_code) VALUES("Afghanistan","AFG");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Albania","ALB");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Algeria","DZA");
INSERT INTO COUNTRY(country_name, country_code) VALUES("American Samoa","ASM");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Andorra","AND");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Angola","AGO");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Anguilla","AIA");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Antarctica","ATA");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Antigua and Barbuda","ATG");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Argentina","ARG");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Armenia","ARM");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Aruba","ABW");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Australia","AUS");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Austria","AUT");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Azerbaijan","AZE");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bahamas","BHS");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bahrain","BHR");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bangladesh","BGD");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Barbados","BRB");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Belarus","BLR");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Belgium","BEL");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Belize","BLZ");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Benin","BEN");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Belize","BLZ");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bermuda","BMU");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bhutan","BTN");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bolivia","BOL");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bonaire","BES");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bosnia and Herzegovina","BIH");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Botswana","BWA");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bouvet Island","BVT");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Brazil","BRA");
INSERT INTO COUNTRY(country_name, country_code) VALUES("British Indian Ocean Territory","IOT");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Brunei Darussalam","BRN");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Bulgaria","BGR");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Burkina Faso","BFA");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Burundi","BDI");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cabo Verde","CPV");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cambodia","KHM");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cameroon","CMR");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Canada","CAN");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cayman Islands","CYM");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Central African Republic","CAF");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Chad","TCD");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Chile","CHL");
INSERT INTO COUNTRY(country_name, country_code) VALUES("China","CHN");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Christmas Island","CCK");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cocos","CCK");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Colombia","COL");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Comoros","COM");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Congo","COG");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cook Islands","COK");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Costa Rica","CRI");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Croatia","HRV");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cuba","CUB");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Curaçao","CUW");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Cyprus","CYP");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Czechia","CZE");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Côte d'Ivoire","CIV");
INSERT INTO COUNTRY(country_name, country_code) VALUES("Denmark","DNK");

-- Table: STATE
INSERT INTO STATE(state_name, state_code, country_id) VALUES("Queensland","QLD", 13);
INSERT INTO STATE(state_name, state_code, country_id) VALUES("New South Wales","NSW", 13);
INSERT INTO STATE(state_name, state_code, country_id) VALUES("Victoria","VIC", 13);
INSERT INTO STATE(state_name, state_code, country_id) VALUES("Western Australia","WA", 13);
INSERT INTO STATE(state_name, state_code, country_id) VALUES("South Australia","SA", 13);
INSERT INTO STATE(state_name, state_code, country_id) VALUES("Tasmania","TAS", 13);
INSERT INTO STATE(state_name, state_code, country_id) VALUES("Australian Capital Territory","ACT", 13);
INSERT INTO STATE(state_name, state_code, country_id) VALUES("Northern Territory","NT", 13);


INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(1, 3, 'Sneezing, itchy eyes', 1, '2022-05-14', 'Seasonal symptoms during spring.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(2, 5, 'Skin rash, nausea', 2, '2021-11-08', 'Reaction to dairy products.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(3, 8, 'Swelling, difficulty breathing', 3, '2023-03-21', 'Severe reaction to bee sting, carries epinephrine.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(4, 12, 'Itchy skin, congestion', 1, '2020-08-30', 'Mild symptoms around cats.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(5, 17, 'Swelling, abdominal pain', 2, '2019-02-14', 'Avoids eating avocados.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(6, 24, 'Headaches, skin rash', 1, '2022-09-09', 'Reacts to perfumes and strong scents.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(7, 9, 'Skin rash, stomach pain', 2, '2021-10-05', 'Reacts to wheat-based products.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(8, 14, 'Hives, dizziness', 3, '2020-06-16', 'Severe reaction to latex, avoids exposure.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(9, 18, 'Abdominal pain, itchy mouth', 1, '2018-12-20', 'Mild reaction to bananas.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(10, 22, 'Hives, swelling', 2, '2023-01-11', 'Reacts strongly to sesame seeds.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(11, 28, 'Abdominal cramps, rash', 1, '2020-07-24', 'Mild intolerance to oats.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(11, 32, 'Headache, skin rash', 1, '2021-05-12', 'Mild reaction to coconut products.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(1, 4, 'Itchy throat, runny nose', 1, '2023-04-18', 'Pollen allergy worse during spring.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(2, 7, 'Sneezing, itchy eyes', 2, '2019-11-27', 'Worsens during dusty conditions.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(3, 13, 'Hives, nausea', 3, '2022-10-06', 'Severe peanut allergy.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(4, 19, 'Swelling, itchy mouth', 2, '2021-02-23', 'Avoids garlic in foods.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(5, 15, 'Red rash, skin irritation', 1, '2020-11-15', 'Sensitive to certain sunscreens.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(6, 21, 'Abdominal pain, bloating', 2, '2021-09-14', 'Wheat allergy, avoids gluten.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(7, 29, 'Swelling, itchy skin', 2, '2022-02-22', 'Mild reaction to strawberries.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(8, 6, 'Skin rash, difficulty breathing', 3, '2018-12-01', 'Severe milk allergy.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(9, 11, 'Nausea, headache', 1, '2023-01-29', 'Minor reaction to chocolate.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(10, 30, 'Itchy mouth, abdominal pain', 2, '2022-04-03', 'Sensitivity to sunflower seeds.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(11, 34, 'Itchy skin, watery eyes', 1, '2020-10-19', 'Allergic reaction to tomatoes.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(1, 1, 'Hives, trouble breathing', 3, '2023-07-15', 'Carries epinephrine for peanut allerg;.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(1, 23, 'Coughing, itchy eyes', 2, '2020-03-10', 'Reaction to pollen, especially during spr;ng.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(2, 35, 'Nausea, stomach cramps', 2, '2021-06-18', 'Mild soy allergy.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(3, 37, 'Itchy skin, congestion', 1, '2023-08-05', 'Mild reaction to perfumes.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(4, 25, 'Hives, abdominal pain', 3, '2022-02-14', 'Severe fish allergy, avoids all seafood.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(5, 16, 'Rash, blisters', 2, '2021-01-20', 'Skin sensitivity to direct sunlight.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(6, 27, 'Swelling, hives', 3, '2019-05-23', 'Severe egg allergy, avoids all egg products.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(7, 10, 'Coughing, itchy eyes', 1, '2023-03-09', 'Dust allergy, uses air filters.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(8, 36, 'Hives, stomach pain', 2, '2020-09-11', 'Reaction to strawberries.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(9, 2, 'Swelling, difficulty breathing', 3, '2021-07-08', 'Severe shellfish allergy.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(10, 26, 'Skin rash, headache', 1, '2023-11-01', 'Mild fragrance allergy.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(11, 20, 'Rash, swelling', 2, '2018-10-28', 'Avoids apples due to itchy mouth reaction.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(3, 33, 'Rash, hives', 1, '2022-05-25', 'Mild reaction to chocolate.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(1, 31, 'Itchy throat, stomach upset', 2, '2020-01-30', 'Allergic to pepper in foods.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(2, 38, 'Swelling, nausea', 2, '2021-03-18', 'Severe coconut allergy.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(3, 12, 'Itchy eyes, sneezing', 1, '2019-06-07', 'Reaction to pet dander, mostly cats.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(4, 14, 'Skin rash, swelling', 2, '2023-02-14', 'Severe latex allergy, avoids latex product;.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(5, 22, 'Nausea, stomach upset', 1, '2022-04-16', 'Mild reaction to soy.');
INSERT INTO USERS_ALLERGY (user_id, allergy_id, symptoms, severity_id, date_diagnosed, notes) VALUES(6, 20, 'Itchy mouth, throat irritation', 1, '2020-05-20', 'Reacts mildly to apples.');
