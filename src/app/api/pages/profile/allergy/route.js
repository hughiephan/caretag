// Next Imports
import { NextResponse } from 'next/server'

import {addUsersAllergyByUserId, getAllergies, getSeverities, modifyUsersAllergyById} from '@/app/server/action'


export async function POST(request) {

    console.log("addAllergyByUserId");
    let body = await request.json();

    console.log("body")
    console.log(body)

    const res = await addUsersAllergyByUserId(body);

    console.log(res);

    return NextResponse.json({status:200});
  }

  export async function GET() {
    const res = await getAllergies();

    // debug
    //console.log(res);

    return NextResponse.json(res);
}


export async function PUT(request) {
  console.log("modifyAllergyByUserId");
  let body = await request.json();

  console.log("body")
  console.log(body)

  const res = await modifyUsersAllergyById(body);

  console.log(res);

  return NextResponse.json({status:200});
}
