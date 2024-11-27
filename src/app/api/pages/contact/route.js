// Next Imports
import { NextResponse } from 'next/server'

import {getUserDataByEmail, getUserContactByUserId, addUserContactByUserId, deleteUserContactByUserIdAndContactId} from '@/app/server/action'


export async function GET(request) {
    console.log(request);

    const searchParams = request.nextUrl.searchParams

    console.log(searchParams)

    const userId = searchParams.get('userId')

    const contacts = await getUserContactByUserId(userId)

    console.log(await contacts)
    
    return NextResponse.json(contacts)
}


export async function POST(request) {
    console.log(request);

    let body = await request.json();
    

    // console.log("body+")
    // console.log(body)
    // get contact id
    const user = await getUserDataByEmail(`${body.email}`)
    // console.log(await user)
    delete body.email
    delete body.phone
    body.contact_id = await user[0].user_id
    body.is_primary = false // default
    console.log(body)

    const contacts = await addUserContactByUserId(body)

    console.log(contacts)
    
    return NextResponse.json({status:200})
}


export async function DELETE(request) {
    console.log(request);

    let body = await request.json();

    // console.log("body+")
    // console.log(body)
    // get contact id
    const user = await getUserDataByEmail(`${body.email}`)
    // console.log(await user)
    const contact_id = await user[0].user_id

    const response = await deleteUserContactByUserIdAndContactId(body.user_id, contact_id)
    console.log(response)
    
    return NextResponse.json({status:200})
}
