// Next Imports
import { NextResponse } from 'next/server'

import sendPromptToChatGPT from './openapi'

export async function GET() {
  const fakePromptData = {
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
        commonSymptoms: "none",
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
        commonSymptoms: "none",
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
  };

  const result = await sendPromptToChatGPT(`summary and give helpful feedback in HTML format about the health information below ${fakePromptData}`);

      console.log(result)
      
      const response = {message:result};
    
  return NextResponse.json(response)
} 
  