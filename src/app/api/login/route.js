// Next Imports
import { NextResponse } from 'next/server'

// Mock data for demo purpose
// import { users } from './users'

import {getUserDataByEmail} from '@/app/server/action'

export async function POST(req) {
  // Vars
  const { email, password, token } = await req.json()
  let users = [];
  let user = null;

  if (email) {
    users = await getUserDataByEmail(email)
    user = users.find(u => u.email === email)
  } else if (token) {
    console.log('using token')
    console.log(token)
    
    // switch any kind decode or decrypt method for token in future
    const plain_token = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    
    users = await getUserDataByEmail(plain_token.email)
    user = users.find(u => u.email === plain_token.email)
  }

  
  
  let response = null

  if (user) {
    const { password: _, ...filteredUserData } = user

    response = {
      ...filteredUserData
    }

    return NextResponse.json(response)
  } else {
    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: ['Email or Password is invalid']
      },
      {
        status: 401,
        statusText: 'Unauthorized Access'
      }
    )
  }
}
