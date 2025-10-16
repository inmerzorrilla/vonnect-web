
import { NextRequest, NextResponse } from 'next/server'

// Access the same global storage
const chatResponses = (globalThis as any).__telegram_responses || new Map()
const responseTimestamps = (globalThis as any).__telegram_timestamps || new Map()

export async function POST(request: NextRequest) {
  try {
    const { chatId, message, from } = await request.json()
    
    if (!chatId || !message) {
      return NextResponse.json({ error: 'Missing chatId or message' }, { status: 400 })
    }

    console.log(`🧪 SIMULATION: Storing reply for chatId "${chatId}": ${message}`)
    
    // Simulate a Telegram response
    const responseData = {
      message: message,
      timestamp: Date.now(),
      messageId: Date.now(),
      from: from || 'Test Support'
    }
    
    chatResponses.set(chatId, responseData)
    responseTimestamps.set(chatId, Date.now())
    
    console.log(`✅ SIMULATION: Response stored for chat "${chatId}"`)
    console.log(`📊 Total responses in memory: ${chatResponses.size}`)
    console.log(`🗂️ All stored chat IDs: [${Array.from(chatResponses.keys()).join(', ')}]`)
    
    return NextResponse.json({
      success: true,
      message: `Simulated reply stored for chatId: ${chatId}`,
      storedResponse: responseData,
      totalResponses: chatResponses.size
    })

  } catch (error) {
    console.error('Simulation error:', error)
    return NextResponse.json({ 
      error: 'Simulation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Telegram Reply Simulation Endpoint',
    usage: {
      post: 'POST with { "chatId": "your-chat-id", "message": "test reply", "from": "Test User" }',
      description: 'This simulates a Telegram response being stored in memory'
    },
    currentState: {
      totalResponses: chatResponses.size,
      storedChatIds: Array.from(chatResponses.keys())
    }
  })
}
