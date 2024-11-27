// Next Imports
import { NextResponse } from 'next/server'

import {modifyAdministeredById, deleteAdministeredById, addAdministeredById} from '@/app/server/action'

export async function POST(request) {
    let body = await request.json();
    console.log("addAdministeredById")
    console.log(body)
    const res = await addAdministeredById(body)
    console.log(res)
    return NextResponse.json({status:200});
}


export async function PUT(request) {
    let body = await request.json();
    console.log("modifyAdministeredById")
    console.log(body)
    const res = await modifyAdministeredById(body)
    console.log(res)
    return NextResponse.json({status:200});
}

export async function DELETE(request) {
    const searchParams = request.nextUrl.searchParams

    console.log(searchParams)

    const id = searchParams.get('id')
    console.log("deleteAdministeredById")
    const res = await deleteAdministeredById(id)
    console.log(res)
    return NextResponse.json({status:200});
}
