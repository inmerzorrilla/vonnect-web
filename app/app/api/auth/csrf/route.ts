
import { NextResponse } from 'next/server'

export async function GET() {
  // Generate a simple CSRF token for demo purposes
  const csrfToken = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15)
  
  return NextResponse.json({
    csrfToken
  })
}
