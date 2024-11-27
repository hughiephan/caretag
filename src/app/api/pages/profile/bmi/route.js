// Next Imports
import { NextResponse } from 'next/server'

import {addBMIByUserId} from '@/app/server/action'


export async function POST(request) {
  
    console.log("addBMIByUserId");
    let body = await request.json();
  
    console.log("body")
    delete body.id;
    console.log(body)
  
    const res = await addBMIByUserId(body);
    
    console.log(res);
  
    return NextResponse.json({status:200});
  }
  
  
  