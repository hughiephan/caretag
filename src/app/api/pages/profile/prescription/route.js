// Next Imports
import { NextResponse } from 'next/server'

import {getUserDataByEmail, addPrescription, deletePrescriptionById} from '@/app/server/action'

export async function POST(request) {
    console.log(request)
    let body = await request.json();
    console.log("addPrescription")
    console.log(body)
    // change doctor_email to doctor_id
    const user = await getUserDataByEmail(body.doctor_email)
    console.log(user)
    body.doctor_id = user[0].user_id;
    delete body.doctor_email
    console.log(body)
    const res = await addPrescription(body)
    console.log(res)
    return NextResponse.json({status:200});
}


export async function DELETE(request) {
    const searchParams = request.nextUrl.searchParams

    console.log(searchParams)

    const id = searchParams.get('id')
    console.log("deletePrescriptionById")
    const res = await deletePrescriptionById(id)
    console.log(res)
    return NextResponse.json({status:200});
}
