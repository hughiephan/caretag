// Next Imports
import { NextResponse } from 'next/server'

import {getServerSession} from 'next-auth'

import {getUserDataByEmail, getUserDataById, updateUserDataByid, getBMIByUserId, getAllergyByUserId, getVitalSignsByUserId, getGenderByName, getSexByName, getBloodTypeByName, getAdministeredByUserId, getPrescriptionByUserId} from '@/app/server/action'

export async function GET(request) {
  console.log(request);


  const searchParams = request.nextUrl.searchParams
  
  console.log(searchParams)

  let userId = searchParams.get('userId')
  
  if (userId==undefined || userId == 'undefined') {
    const session = await getServerSession()

    console.log("getServerSession")
    console.log(await session)
    const users = await getUserDataByEmail(session.user.email)

    userId = await users[0].user_id;
  }

  console.log("userId")
  console.log(userId)

  let user = await getUserDataById(userId)
  let bmi = await getBMIByUserId(userId)
  let allergies = await getAllergyByUserId(userId)
  let vitalSigns = await getVitalSignsByUserId(userId)
  let prescriptions = await getPrescriptionByUserId(userId)
  let administered = await getAdministeredByUserId(userId)
  
  // debug
  //console.log(user)
  //console.log(bmi)
  // console.log(allergies)
  // console.log(vitalSigns)
  // console.log(administered)
  console.log('========================')

  const aboutDataModel = {
    user: await user,
    BMI: await bmi,
    allergies: await allergies,
    vitalSigns: await vitalSigns,
    prescriptions: await prescriptions,
    administered: await administered
  }

  //console.log(aboutDataModel)

  return NextResponse.json(aboutDataModel)
}


export async function PUT(request) {
  
  console.log("updateUserDataByid");
  let body = await request.json();

  console.log("body")
  console.log(body)

  const res = await updateUserDataByid(body);
  
  console.log(res);

  return NextResponse.json({status:200});
}


