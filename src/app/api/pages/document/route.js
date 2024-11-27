// Next Imports
import { NextResponse } from 'next/server'

import {storeFiles, readFiles} from '@/app/server/ec2'

export async function GET(request) {
    console.log(request);

    const searchParams = request.nextUrl.searchParams

    console.log(searchParams)

    const userId = searchParams.get('userId')

    const files = await readFiles(userId);

    return NextResponse.json(files)
}

/*
body: {
    data: file binary format,
    userId: string 
}

*/
export async function POST(request) {
    let body = await request.json();

    console.log("body")
    console.log(body)
    const res = await storeFiles(`${body.userId}`, body.files)
    console.log(res)
    return NextResponse.json(res)
}
  