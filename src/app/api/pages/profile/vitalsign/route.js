// Next Imports
import { NextResponse } from 'next/server'

import {updateVitalSignByUserId, addVitalSignByUserId, deleteVitalSignByUserIdandDate} from '@/app/server/action'

export async function PUT(request) {
    let body = await request.json();

    // console.log("bodyv")
    // console.log(body)

    const res = await updateVitalSignByUserId(body)

    console.log(await res);
    
    return NextResponse.json({status:200});
}

export async function POST(request) {
    let body = await request.json();
  
    // console.log("body")
    // console.log(body)

    const res = await addVitalSignByUserId(body);
    
    console.log(res);
    
    return NextResponse.json({status:200});
}

export async function DELETE(request) {
    let body = await request.json();

    console.log("body")
    console.log(body)

    const res = await deleteVitalSignByUserIdandDate(body);
    
    console.log(res);

    return NextResponse.json({status:200});
}
