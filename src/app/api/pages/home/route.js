// Next Imports
import { NextResponse } from 'next/server'

export async function GET() {
    const response = {message:"ABC"};

  return NextResponse.json(response)
} 
  