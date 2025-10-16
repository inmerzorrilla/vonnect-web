
import { NextRequest, NextResponse } from 'next/server'

// Import the same storage from webhook
// Note: This is a hack for debugging - in production, use a proper database
const chatResponses = (globalThis as any).__telegram_responses || new Map()
const responseTimestamps = (globalThis as any).__telegram_timestamps || new Map()

export async function GET(request: NextRequest) {
  try {
    const responses = Array.from(chatResponses.entries()).map((entry) => {
      const [chatId, data] = entry as [string, any]
      return {
        chatId,
        message: data.message,
        from: data.from,
        timestamp: new Date(data.timestamp).toISOString(),
        messageId: data.messageId
      }
    })

    const timestamps = Array.from(responseTimestamps.entries()).map((entry) => {
      const [chatId, ts] = entry as [string, number]
      return {
        chatId,
        timestamp: new Date(ts).toISOString()
      }
    })

    return NextResponse.json({
      totalResponses: chatResponses.size,
      responses,
      timestamps,
      serverTime: new Date().toISOString()
    }, { status: 200 })

  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ 
      error: 'Failed to get debug info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    chatResponses.clear()
    responseTimestamps.clear()
    
    return NextResponse.json({
      success: true,
      message: 'All cached responses cleared'
    }, { status: 200 })

  } catch (error) {
    console.error('Debug clear error:', error)
    return NextResponse.json({ 
      error: 'Failed to clear responses',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
