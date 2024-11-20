// Next Imports
import { NextResponse } from 'next/server'

import {getUserDataById, getAddressByUserId, getBMIByUserId, getAllergyByUserId, getVitalSignsByUserId} from '@/app/server/action'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  
  console.log('searchParams'+searchParams)

  const userId = searchParams.get('userId')
  
  if (userId!=undefined && userId != 'undefined') {
    let user = await getUserDataById(userId)
    let address = await getAddressByUserId(userId)
    let bmi = await getBMIByUserId(userId)
    let allergy = await getAllergyByUserId(userId)
    let vitalSigns = await getVitalSignsByUserId(userId)
    
    // debug
    // console.log(user)
    // console.log(address)
    // console.log(bmi)
    // console.log(allergy)
    // console.log(vitalSigns)

    const aboutDataModel = {
      user: {
        user_id: userId,
        date_joined: user.date_joined,
        first_name: user.first_name,
        middle_names: user.middle_names,
        last_name: user.last_name,
        dob: user.dob,
        gender_name: user.gender_name,
        sex_name: user.sex_name,
        blood_type_name: user.blood_type_name,
        phone: user.phone,
        email: user.email
      }
    }
    
    console.log(aboutDataModel)
  }

  

  const userFakeMidHistoryData = {
    user: {
      id: '1',
      firstName:'Nikolai',
      middleNames: 'Pio',
      lastName: 'Hákon',
      address: '74 Victoria Street, West End (4101)',
      city:'Brisbane',
      country:'Australia',
      dob:'3/11/2000',
      sex:'Male',
      gender:'Male',
      bloodType: 'O+'
    },
    BMI: [
      {
        date: '1/1/2022',
        weight: 80.1,
        height: 180.1,
        bmi:  24.1
      },
      {
        date: '1/1/2023',
        weight: 76.1,
        height: 190.1,
        bmi:  23.1
      },
      {
        date: '1/1/2024',
        weight: 86.1,
        height: 190.2,
        bmi:  22.1
      }
    ],
    allergies: [
      {
        id: '1',
        name: "XXX",
        category: "--",
        description: "desc",
        commonSymptoms: "penut",
        serverity: 3,
        dateDiagnosed: "2024/11/23",
        notes: "none"
      },
      {
        id: '2',
        name: "XXY",
        category: "--",
        description: "desc",
        commonSymptoms: "penut",
        serverity: 3,
        dateDiagnosed: "2024/11/24",
        notes: "none"
      }
    ],
    vitalSigns: [
      {
        dateTake: "1/1/2000",
        takenBy: 1,
        temperature: 34.1,
        heartRate: 111.1,
        bloodPressure: 230.1,
        glucoseLevels: 11.1
      },
      {
        dateTake: "1/2/2001",
        takenBy: 1,
        temperature: 32.1,
        heartRate: 131.1,
        bloodPressure: 220.1,
        glucoseLevels: 13.1
      },
      {
        dateTake: "1/2/2002",
        takenBy: 1,
        temperature: 32.1,
        heartRate: 131.1,
        bloodPressure: 220.1,
        glucoseLevels: 13.1
      },
      {
        dateTake: "1/2/2003",
        takenBy: 1,
        temperature: 32.1,
        heartRate: 131.1,
        bloodPressure: 220.1,
        glucoseLevels: 13.1
      }
    ]
  }
  
  return NextResponse.json(userFakeMidHistoryData)
}
