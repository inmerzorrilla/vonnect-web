
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll just return success
    // In a real app, you'd create the user in your database
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: { email, name: name || 'User' }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Signup endpoint',
    method: 'POST',
    fields: ['email', 'password', 'name']
  })
}
