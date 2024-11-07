/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */
'use server'

// Data Imports
import { db as eCommerceData } from '@/fake-db/apps/ecommerce'
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as invoiceData } from '@/fake-db/apps/invoice'
import { db as userData } from '@/fake-db/apps/userList'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widgetExamples'
import {getAllEmployees} from "../../controller/employee"
import pool from '../../configs/db'
import Connections from '@/views/pages/account-settings/connections'

export const getEcommerceData = async () => {
  return eCommerceData
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  return invoiceData
}

export const getUserData = async () => {
  return userData
}

export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}

export const getEmployees = async (email) => {
  
  const currentUserData = await getCurrentUserData(email);

  const currentUser = {
    "header":{
      "fullName" : "",
      "location" : "",
      "joiningDate" : "",
      "designation" : "",
      "profileImg" : "",
      "designationIcon" : "",
      "coverImg" : "",
    },
    "address":{
      "current":{
        "fullAddress":"",
        "streetNumber":"",
        "streetName":"",
        "suburb":"",
        "city":"",
        "state":{"code":"","name":""},
        "country":{"code":"","name":""},
        "postcode":""
      },
      "list":[]
    },
    "profile":{
      "about":[],
      "contacts":[],
      "teams":[],
      "overview":[],
      "connections":[],
      "teamTech":[],
      "projectTable":[]
    }
    

  };

  if(currentUserData.length>0){
    const userAddresses = await getAddress(currentUserData[0]['user_id']);
    
    
    //console.log('Addresses',userAddresses);

    for(const [index,value] of userAddresses.entries()){
      const userAddress = {
        "fullAddress":`${value['steet_number']} ${value['street_name']}, ${value['suburb']} (${value['postcode']}), ${value['city']}, ${value['state_code']} ${value['country_name']}`,
        "streetNumber":value['steet_number'],
        "streetName":value['street_name'],
        "suburb":value['suburb'],
        "city":value['city'],
        "state":{"code":value['state_code'],"name":value['state_name']},
        "country":{"code":value['country_code'],"name":value['country_name']},
        "postcode":value['postcode']
      }

      if(index==0){
        currentUser.address.current = JSON.parse(JSON.stringify(userAddress));
      }

      currentUser.address.list.push(userAddress);

      
    }
  }

  if(currentUserData.length>0){
    currentUser["header"]["fullName"] = currentUserData[0]['first_name'] + " " + currentUserData[0]['middle_names'] + " "+ currentUserData[0]['last_name'];
    currentUser["header"]["location"] = currentUser.address.current.fullAddress;
    currentUser["header"]["joiningDate"] = `${currentUserData[0]['dob'].getDate()}/${(currentUserData[0]['dob'].getMonth())+1}/${currentUserData[0]['dob'].getFullYear()}`
    currentUser["header"]["designation"] = currentUserData[0]['sex_name']
    currentUser["header"]["profileImg"] = '/images/avatars/1.png'
    currentUser["header"]["designationIcon"] = 'ri-palette-line'
    currentUser["header"]["coverImg"] = '/images/pages/profile-banner.png'
    
    console.log(currentUserData)
    currentUser["profile"]["about"].push({ property: 'Full Name', value: currentUser["header"]["fullName"], icon: 'ri-user-3-line' });
    currentUser["profile"]["about"].push({ property: 'Address', value: `${currentUser["address"]["current"]["streetNumber"]} ${currentUser["address"]["current"]["streetName"]}, ${currentUser["address"]["current"]["suburb"]} (${currentUser["address"]["current"]["postcode"]})`, icon: 'ri-user-3-line' });
    currentUser["profile"]["about"].push({ property: 'City', value: currentUser["address"]["current"]["city"], icon: 'ri-user-3-line' });
    currentUser["profile"]["about"].push({ property: 'Country', value: currentUser["address"]["current"]["country"]["name"], icon: 'ri-user-3-line' });
    currentUser["profile"]["about"].push({ property: 'DOB', value: `${currentUserData[0]['dob'].getDate()}/${(currentUserData[0]['dob'].getMonth())+1}/${currentUserData[0]['dob'].getFullYear()}`, icon: 'ri-user-3-line' });
    currentUser["profile"]["about"].push({ property: 'Sex', value: currentUserData[0]['sex_name'], icon: 'ri-user-3-line' });
    currentUser["profile"]["about"].push({ property: 'Gender', value: currentUserData[0]['gender_name'], icon: 'ri-user-3-line' });
    currentUser["profile"]["about"].push({ property: 'Blood Type', value: currentUserData[0]["blood_type_name"], icon: 'ri-user-3-line' });
  }

  return currentUser;
}

const getAddress = async (userid) => {

  const state_join = `INNER JOIN COUNTRY ON USERS_ADDRESS.country_id = COUNTRY.country_id`;
  const country_join = `INNER JOIN STATE ON USERS_ADDRESS.state_id = STATE.state_id `;
  
  const columns = `USERS_ADDRESS.steet_number, USERS_ADDRESS.street_name, USERS_ADDRESS.suburb, USERS_ADDRESS.city, STATE.state_name, STATE.state_code, COUNTRY.country_name, COUNTRY.country_code, USERS_ADDRESS.postcode`

  return pool.GET(columns,'USERS_ADDRESS',`${state_join} ${country_join}`,`WHERE user_id = '${userid}'`);
}

const getCurrentUserData = async (email) => {
  const gender_join = `INNER JOIN GENDER ON USERS.gender_id = GENDER.gender_id`;
  const sex_join = `INNER JOIN SEX ON USERS.gender_id = SEX.sex_id`;
  const blood_type_join = `INNER JOIN BLOOD_TYPE ON USERS.blood_type_id = BLOOD_TYPE.blood_type_id `;
  const columns = `USERS.user_id,USERS.first_name,USERS.date_joined, USERS.middle_names, USERS.last_name, USERS.dob, USERS.phone, USERS.email, GENDER.gender_name, SEX.sex_name, BLOOD_TYPE.blood_type_name`
  
  return pool.GET(columns,'USERS',`${gender_join} ${sex_join} ${blood_type_join}`,`WHERE email = '${email}'`);
  
}
