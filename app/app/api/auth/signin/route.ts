
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll just return success
    // In a real app, you'd validate credentials against your database
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { email, name: 'Demo User' }
    })

  } catch (error) {
    console.error('Signin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Signin endpoint',
    method: 'POST',
    fields: ['email', 'password']
  })
}
