// Next Imports
import { NextResponse } from 'next/server'

import sendPromptToChatGPT from './openapi'

import {getUserDataById, getBMIByUserId, getAllergyById, getVitalSignsByUserId, getPrescriptionByUserId, getAdministeredByUserId} from '@/app/server/action'

export async function GET(request) {
  // console.log(request);
  const searchParams = request.nextUrl.searchParams

  // console.log(searchParams)
  const id = searchParams.get('userId')

  const promptData = {
    user: await getUserDataById(id),
    BMI: await getBMIByUserId(id),
    Allergies: await getAllergyById(id),
    vitalSigns: await getVitalSignsByUserId(id),
    prescription: await getPrescriptionByUserId(id),
    administered: await getAdministeredByUserId(id)
  }

  const result = await sendPromptToChatGPT(`
give me  health summary using this structutre Prompt in HTML Format and table,th,td use the border property with border: 1px solid:
Generate a detailed patient health summary in the following structured format:
  (title) Personal Information
Field Details
Name [Name]
DOB [Date of Birth]
Age [Age]
Gender [Male/Female]
Address [Full Address]
Background
Field Details
Allergy [List allergies or "None"]
BMI [BMI value]
Blood Type [Blood type]
Assessments
(title) Vital Signs
Field Details
Date Taken Taken By Temp Heart Rate Blood Pressure Blood Glucose Level
[Date Taken] [Taken By] [Temp] [Heart Rate] [Blood Pressure] [Blood Glucose Level]
[Date Taken] [Taken By] [Temp] [Heart Rate] [Blood Pressure] [Blood Glucose Level]
[Date Taken] [Taken By] [Temp] [Heart Rate] [Blood Pressure] [Blood Glucose Level]
Medication
(subtitle) Prescriptions
Field Details
Medication Prescribed by Date Refills Dosage Side Effect Frequency
[Medication] [Doctor Name] [Date] [Refills] [Dosage] [Side Effect] [Frequency]
(subtitle) Administered
Field Details
Medication Date Administered  End Date Dosage Side Effect Effectiveness Frequency
[Medication] [Date Administered] [End Date] [Dosage] [Side Effect] [Effectiveness] [Frequency]
Key Notes
[List key concerns or actions required in dot points.] in HTML format
     about the health information below ${JSON.stringify(promptData)}`);

      console.log(result)
      
      const response = {message:result};
    
  return NextResponse.json(response)
} 
  