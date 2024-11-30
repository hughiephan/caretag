`use server`

import pool from '../../configs/db'

// Login
export const getLoginDataByUserName = async (name) => {
  const columns = `*`;
  const table = `LOGIN`;
  const join = ``;
  const conditions = `WHERE user_username = '${name}'`;

  return pool.GET(columns,table,join,conditions);
}

// User
` {
    user_id: 1,
    date_joined: 2024-11-03T06:30:00.000Z,
    first_name: 'Nikolai',
    middle_names: 'Pio',
    last_name: 'Hákon',
    dob: 2000-11-02T16:00:00.000Z,
    gender_name: 'Male',
    sex_name: 'Male',
    blood_type_name: 'O+',
    phone: 455555552,
    email: 'nikolaiph@example.com',
    address: '4000 Queen St Brisbane CBD Brisbane Queensland Australia'
    city: 'Brisbane'
    country: 'Australia'
    }`

export const getUserDataById = async (id) => {
  const columns = `USERS.user_id, date_joined, first_name, middle_names, last_name, dob, GENDER.gender_name, SEX.sex_name, BLOOD_TYPE.blood_type_name, phone, email, address, city, country` ;
  
  const table = `USERS`;
  const gender_join = `INNER JOIN GENDER ON GENDER.gender_id = USERS.gender_id`;
  const sex_join = `INNER JOIN SEX ON SEX.sex_id = USERS.sex_id`;
  const blood_type_join = `INNER JOIN BLOOD_TYPE ON BLOOD_TYPE.blood_type_id = USERS.blood_type_id`;
  const conditions = `WHERE USERS.user_id = '${id}'`;

  return pool.GET(columns,table,`${gender_join} ${sex_join} ${blood_type_join}`,conditions);
}

export const getUserDataByEmail = async (email) => {
  const columns = `*`;
  const table = `USERS`;
  const join = ``;
  const conditions = `WHERE email = '${email}'`;

  return pool.GET(columns,table,join,conditions);
}

export const getUserDataByName = async (email) => {
  const columns = `*`;
  const table = `USERS`;
  const join = ``;
  const conditions = `WHERE email = '${email}'`;

  return pool.GET(columns,table,join,conditions);
}

export const updateUserDataByid = async (data) => {
  const table = `USERS`
  const values = data;
  const conditions = `WHERE user_id = '${data.user_id}'`;

  return pool.PUT(table,values,conditions)
}

// Users_Contact
`{
    first_name: 'John',
    middle_names: null,
    last_name: 'Miller',
    is_primary: 1,
    relationship: 'Parent',
    phone: 555123008,
    email: 'john.miller@example.com'
}`

export const getUserContactByUserId = async (userId) => {
  const columns = `USERS.first_name AS first_name, USERS.middle_names AS middle_names, USERS.last_name AS last_name, is_primary, relationship, USERS.phone AS phone, USERS.email AS email`;
  const table = `USERS_CONTACT`;
  const join = `INNER JOIN USERS ON USERS.user_id = USERS_CONTACT.contact_id`;
  const conditions = `WHERE USERS_CONTACT.user_id = '${userId}'`;

  return pool.GET(columns,table,join,conditions);
} 

export const addUserContactByUserId = async (data) => {
  const table = `USERS_CONTACT`;
  let columns = ``;
  let values = ``;

  for(const key of Object.keys(data)){
    columns += `${key}, `
    values += `'${data[key]}', `
  }

  columns = columns.slice(0, -2);
  values = values.slice(0, -2);
  
  return pool.POST(columns,table,values);
} 

export const deleteUserContactByUserIdAndContactId = async (userId, contactId) => {
  const table = `USERS_CONTACT`;
  const conditions = `user_id = '${userId}' AND contact_id = '${contactId}'`;

  
return pool.DELETE(table,conditions);
}

// Address
`  {
    user_id: 1,
    address_id: 1,
    street_number: 101,
    street_name: 'Queen St',
    suburb: 'Brisbane CBD',
    city: 'Brisbane',
    state_id: 1,
    country_id: 13,
    postcode: 4000,
    country_name: 'Australia',
    country_code: 'AUS',
    state_name: 'Queensland',
    state_code: 'QLD'
}`

export const getAddressByUserId = async (id) => {
  const columns = `*`;
  const table = `USERS_ADDRESS`;
  const state_join = `INNER JOIN COUNTRY ON USERS_ADDRESS.country_id = COUNTRY.country_id`;
  const country_join = `INNER JOIN STATE ON USERS_ADDRESS.state_id = STATE.state_id `;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,`${state_join} ${country_join}`,conditions);
}

// BMI
`{
  user_id: 1,
  date: 2024-12-11T00:15:00.000Z,
  weight: 60,
  height: 1.63,
  BMI: 22.5827
}`

export const getBMIByUserId = async (id) => {
  const columns = `*`;
  const table = `BMI`;
  const join = ``;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,join,conditions);
}

export const addBMIByUserId = async (data) => {
  const table = `BMI`;
  let columns = ``;
  let values = ``;

  for(const key of Object.keys(data)){
    columns += `${key}, `
    values += `'${data[key]}', `
  }

  columns = columns.slice(0, -2);
  values = values.slice(0, -2);
  
  return pool.POST(columns,table,values);
}

// Allergy
`{
  allergy_id: 1,
  allergy_name: 'Peanut Allergy',
  category_id: 4,
  common_symptoms: 'Swelling, hives, difficulty breathing',
  description: 'Allergic reaction to peanuts and peanut-containing products.',
  name: 'Other'
}`

export const getAllergies = async () => {
  const columns = `*`;
  const table = `ALLERGY`;
  const join = `INNER JOIN ALLERGY_CATEGORY ON ALLERGY.category_id = ALLERGY.category_id`;
  const conditions = ``;

  return pool.GET(columns,table,join,conditions);
}

export const getAllergyById = async (id) => {
  const columns = `*`;
  const table = `ALLERGY`;
  const join = `INNER JOIN ALLERGY_CATEGORY ON ALLERGY.category_id = ALLERGY.category_id`;
  const conditions = `WHERE allergy_id = '${id}'`;

  return pool.GET(columns,table,join,conditions);
}

export const addUsersAllergyByUserId = async (data) => {
  const table = `USERS_ALLERGY`;
  let columns = ``;
  let values = ``;

  for(const key of Object.keys(data)){
    columns += `${key}, `
    values += `'${data[key]}', `
  }

  columns = columns.slice(0, -2);
  values = values.slice(0, -2);
  
  return pool.POST(columns,table,values);
}

export const modifyUsersAllergyById = async (data) => {
  const table = `USERS_ALLERGY`;
  const values = data;
  const conditions = `WHERE allergy_id = '${data.allergy_id}'`;
  
  return pool.PUT(table,values,conditions);
}

export const deleteUsersAllergyById = async (data) => {
  const table = `USERS_ALLERGY`;
  const conditions = `user_id = '${data.user_id}' AND date_diagnosed = '${data.date_diagnosed}'`;

  return pool.DELETE(table, conditions);
}

// USERS_ALLERGY
`{
    user_id: 1,
    symptoms: 'Hives, trouble breathing',
    severity_name: 'High',
    date_diagnosed: 2023-07-14T16:00:00.000Z,
    notes: 'Carries epinephrine for peanut allerg;.',
    allergy_name: 'Peanut Allergy',
    category_name: 'Food',
    common_symptoms: 'Swelling, hives, difficulty breathing',
    description: 'Allergic reaction to peanuts and peanut-containing products.'
}`

export const getAllergyByUserId = async (id) => {
  const columns = `user_id, symptoms, SEVERITY.name AS severity_name, date_diagnosed, notes, allergy_name, ALLERGY_CATEGORY.name AS category_name, ALLERGY.common_symptoms, description`;

  const table = `USERS_ALLERGY`;
  const allergy_join = `INNER JOIN ALLERGY ON ALLERGY.allergy_id = USERS_ALLERGY.allergy_id`;
  const allergy_category_join = `INNER JOIN ALLERGY_CATEGORY ON ALLERGY.allergy_id = USERS_ALLERGY.allergy_id AND ALLERGY_CATEGORY.category_id = ALLERGY.category_id`;
  const severity_join = `INNER JOIN SEVERITY ON SEVERITY.severity_id = USERS_ALLERGY.severity_id`;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,`${allergy_join} ${allergy_category_join} ${severity_join}`,conditions);
}


// Vital Signs
`{
  user_id: 1,
  date_taken: 2024-11-21T00:15:00.000Z,
  taken_by: 5,
  temperature: 36.5,
  heart_rate: 68,
  blood_pressure: 121.8,
  glucose_levels: 88
}`

export const getVitalSignsByUserId = async (id) => {
  const columns = `*`;
  const table = `VITAL_SIGNS`;
  const join = ``;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,join,conditions);
}

export const updateVitalSignByUserId = async (data) => {
  const table = `VITAL_SIGNS`;
  const values = data;
  const conditions = `WHERE user_id = '${data.user_id}' AND date_taken='${data.date_taken}'`;
  
  return pool.PUT(table,values,conditions);
}

export const addVitalSignByUserId = async (data) => {
  const table = `VITAL_SIGNS`;
  let columns = ``;
  let values = ``;

  for(const key of Object.keys(data)){
    columns += `${key}, `
    values += `'${data[key]}', `
  }

  columns = columns.slice(0, -2);
  values = values.slice(0, -2);
  
  return pool.POST(columns,table,values);
}

export const deleteVitalSignByUserIdandDate = async (data) => {
  const table = `VITAL_SIGNS`;
  const conditions = `user_id = '${data.user_id}' AND date_taken = '${data.date_taken}'`;

  return pool.DELETE(table,conditions);
}

// Medication
`{
    medication_id: 1,
    name: 'Aspirin',
    manufacturer: 'Bayer',
    medication_type_name: 'Tablet',
    strength: 500,
    unit_of_measure_name: 'mg',
    description: 'Used to reduce pain, fever, or inflammation.',
    side_effects: 'Nausea, stomach pain, bleeding'
  }`

export const getMedicationById = async (id) => {
  const columns = `medication_id, MEDICATION.name, manufacturer, MEDICATION_TYPE.name AS medication_type_name, strength, UNIT_OF_MEASURE.name AS unit_of_measure_name, description, side_effects`;
  const table = `MEDICATION`;
  const medication_type_join = `INNER JOIN MEDICATION_TYPE ON MEDICATION_TYPE.medication_type_id = MEDICATION.medication_type_id`;
  const unit_of_measure_id = `INNER JOIN UNIT_OF_MEASURE ON UNIT_OF_MEASURE.unit_of_measure_id = MEDICATION.unit_of_measure_id`;
  const conditions = `WHERE medication_id = '${id}'`;

  return pool.GET(columns,table,`${medication_type_join} ${unit_of_measure_id}`,conditions);
}


// Administered
`{
    administered_id: 3,
    medication_name: 'Ciprofloxacin',
    user_id: 1,
    date_administered: 2024-10-31T16:00:00.000Z,
    end_date: 2024-11-29T16:00:00.000Z,
    dosage: 10,
    effectiveness_name: 'Medium',
    side_effects: 'Nausea',
    frequency_name: 'Daily'
  }`

export const getAdministeredByUserId = async (userId) => {
  const columns = `administered_id, MEDICATION.name as medication_name, user_id, date_administered, end_date, dosage, EFFECTIVENESS.name AS effectiveness_name, ADMINISTERED.side_effects, FREQUENCY.name AS frequency_name`;
  const table = `ADMINISTERED`;
  const medication_join = `INNER JOIN MEDICATION ON MEDICATION.medication_id = ADMINISTERED.medication_id`;
  const effectiveness_join = `INNER JOIN EFFECTIVENESS ON EFFECTIVENESS.effectiveness_id = ADMINISTERED.effectiveness_id`;
  const frequency_join = `INNER JOIN FREQUENCY ON FREQUENCY.frequency_id = ADMINISTERED.frequency_id`;
  const conditions = `WHERE user_id = '${userId}'`;
  
  return pool.GET(columns,table,`${medication_join} ${effectiveness_join} ${frequency_join}`,conditions);
}

export const modifyAdministeredById = async (data) => {
  const table = `ADMINISTERED`;
  const values = data;
  const conditions = `WHERE administered_id = '${data.administered_id}'`;
  
  return pool.PUT(table,values,conditions);
}

export const deleteAdministeredById = async (id) => {
  const table = `ADMINISTERED`;
  const conditions = `administered_id = '${id}'`;

  
return pool.DELETE(table,conditions);
}

export const addAdministeredById = async (data) => {
  const table = `ADMINISTERED`;
  let columns = ``;
  let values = ``;

  for(const key of Object.keys(data)){
    columns += `${key}, `
    values += `'${data[key]}', `
  }

  columns = columns.slice(0, -2);
  values = values.slice(0, -2);
  console.log(columns)
  console.log(values)
  
return pool.POST(columns,table,values);
} 

// Gender
export const getGenderByName = async (name) => {
  const columns = `*`;
  const table = `GENDER`;
  const conditions = `WHERE gender_name = '${name}'`;
  
  return pool.GET(columns,table,``,conditions);
}

// Sex
export const getSexByName = async (name) => {
  const columns = `*`;
  const table = `SEX`;
  const conditions = `WHERE sex_name = '${name}'`;
  
  return pool.GET(columns,table,``,conditions);
}

// Blood type
export const getBloodTypeByName = async (name) => {
  const columns = `*`;
  const table = `BLOOD_TYPE`;
  const conditions = `WHERE blood_type_name = '${name}'`;
  
  return pool.GET(columns,table,``,conditions);
}

// Severity
export const getSeverities = async () => {
  const columns = `*`;
  const table = `SEVERITY`;

  
return pool.GET(columns,table,``,``);
}


// Prescription
export const getPrescriptionByUserId = async (id) => {
  const columns = `prescription_id, PRESCRIPTION.user_id, DOCTOR.license_number, DOCTOR.specialization, USERS.first_name AS doctor_first_name, USERS.middle_names AS doctor_middle_names, USERS.last_name AS doctor_last_name, USERS.phone AS doctor_phone, USERS.email AS doctor_email, MEDICATION.name AS medication_name, MEDICATION.manufacturer, MEDICATION_TYPE.name AS medication_type_name, MEDICATION.strength, UNIT_OF_MEASURE.name AS unit_of_measure_name, MEDICATION.description, MEDICATION.side_effects, date, dosage, FREQUENCY.name AS frequency_name, refills, notes`;
  const table = `PRESCRIPTION`;
  const user_join = `INNER JOIN USERS ON USERS.user_id = PRESCRIPTION.doctor_id`;
  const doctor_join = `INNER JOIN DOCTOR ON DOCTOR.user_id = PRESCRIPTION.doctor_id`;
  const unit_of_measure_join = `INNER JOIN UNIT_OF_MEASURE ON UNIT_OF_MEASURE.unit_of_measure_id = MEDICATION.unit_of_measure_id`;
  const medication_join = `INNER JOIN MEDICATION ON MEDICATION.medication_id = PRESCRIPTION.medication_id`;
  const medication_type_join = `INNER JOIN MEDICATION_TYPE ON MEDICATION_TYPE.medication_type_id = MEDICATION.medication_type_id`;
  const frequency_join = `INNER JOIN FREQUENCY ON FREQUENCY.frequency_id = PRESCRIPTION.frequency_id`
  const conditions = `WHERE PRESCRIPTION.user_id = '${id}'`;

  return pool.GET(columns,table,`${user_join} ${doctor_join} ${medication_join} ${unit_of_measure_join} ${medication_type_join} ${frequency_join}`,conditions);
}

export const addPrescription = async (data) => {
  const table = `PRESCRIPTION`;
  let columns = ``;
  let values = ``;

  for(const key of Object.keys(data)){
    columns += `${key}, `
    values += `'${data[key]}', `
  }

  columns = columns.slice(0, -2);
  values = values.slice(0, -2);
  console.log(columns)
  console.log(values)
  
return pool.POST(columns,table,values);
} 

export const deletePrescriptionById = async (id) => {
  const table = `PRESCRIPTION`;
  const conditions = `prescription_id = '${id}'`;

  
return pool.DELETE(table,conditions);
}
