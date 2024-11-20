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
export const getUserDataById = async (id) => {
  const columns = `*`;
  const table = `USERS`;
  const gender_join = `INNER JOIN GENDER ON GENDER.gender_id = USERS.gender_id`;
  const sex_join = `INNER JOIN SEX ON SEX.sex_id = USERS.sex_id`;
  const blood_type_join = `INNER JOIN BLOOD_TYPE ON BLOOD_TYPE.blood_type_id = USERS.blood_type_id`;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,`${gender_join} ${sex_join} ${blood_type_join}`,conditions);
}

export const getUserDataByEmail = async (email) => {
  const columns = `*`;
  const table = `USERS`;
  const join = ``;
  const conditions = `WHERE email = '${email}'`;

  return pool.GET(columns,table,join,conditions);
}

export const updateUserDataByid = async (data) => {
  const table = `USERS`
  const values = data;
  const conditions = `WHERE user_id = '${data.id}'`;

  return pool.PUT(table,values,conditions)
}

// Address
export const getAddressByUserId = async (id) => {
  const columns = `*`;
  const table = `USERS_ADDRESS`;
  const state_join = `INNER JOIN COUNTRY ON USERS_ADDRESS.country_id = COUNTRY.country_id`;
  const country_join = `INNER JOIN STATE ON USERS_ADDRESS.state_id = STATE.state_id `;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,`${state_join} ${country_join}`,conditions);
}

// BMI
export const getBMIByUserId = async (id) => {
  const columns = `*`;
  const table = `BMI`;
  const join = ``;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,join,conditions);
}

// Allergy
export const getAllergyById = async (id) => {
  const columns = `*`;
  const table = `ALLERGY`;
  const join = `INNER JOIN ALLERGY_CATEGORY ON ALLERGY.category_id = ALLERGY.category_id`;
  const conditions = `WHERE allergy_id = '${id}'`;

  return pool.GET(columns,table,join,conditions);
}

export const getAllergyByUserId = async (id) => {
  const columns = `*`;
  const table = `USERS_ALLERGY`;
  const allergy_join = `INNER JOIN ALLERGY ON ALLERGY.allergy_id = USERS_ALLERGY.allergy_id`;
  const severity_join = `INNER JOIN SEVERITY ON SEVERITY.severity_id = USERS_ALLERGY.severity_id`;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,`${allergy_join} ${severity_join}`,conditions);
}

// Vital Signs
export const getVitalSignsByUserId = async (id) => {
  const columns = `*`;
  const table = `VITAL_SIGNS`;
  const join = ``;
  const conditions = `WHERE user_id = '${id}'`;

  return pool.GET(columns,table,join,conditions);
}

// Medication
export const getMedicationById = async (id) => {
  const columns = `*`;
  const table = `MEDICATION`;
  const medication_type_join = `INNER JOIN MEDICATION_TYPE ON MEDICATION_TYPE.medication_type_id = MEDICATION.medication_type_id`;
  const unit_of_measure_id = `INNER JOIN UNIT_OF_MEASURE ON UNIT_OF_MEASURE.unit_of_measure_id = MEDICATION.unit_of_measure_id`;
  const conditions = `WHERE medication_id = '${id}'`;

  return pool.GET(columns,table,`${medication_type_join} ${unit_of_measure_id}`,conditions);
}

