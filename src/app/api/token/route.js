// Next Imports
import { NextResponse } from 'next/server'

import {getServerSession} from 'next-auth'

export async function GET() {

  const session = await getServerSession()
  const email = {email: await session.user.email};

  console.log(email)

  // Encourage changing the encoding method to an encryption method for better security
  const token = Buffer.from(JSON.stringify(email)).toString("base64");

  return NextResponse.json({data: token})
}
