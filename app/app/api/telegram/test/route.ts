
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

export async function POST(request: NextRequest) {
  try {
    const { action, chatId, message } = await request.json()
    
    if (action === 'send_test') {
      // Send a test message to Telegram
      const testMessage = `🧪 Test message from vonnect.net\n\n📱 ID: test-${Date.now()}\n👤 Usuario: Test User\n\n📝 Mensaje:\n"${message || 'This is a test message'}"\n\n_Please reply to test the return flow._`
      
      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: testMessage,
          parse_mode: 'Markdown'
        })
      })
      
      const result = await response.json()
      
      return NextResponse.json({
        success: result.ok,
        message: result.ok ? 'Test message sent' : 'Failed to send test message',
        result
      })
    }
    
    if (action === 'check_responses') {
      // Access the global storage to check for responses
      const chatResponses = (globalThis as any).__telegram_responses || new Map()
      const testChatId = `test-${chatId}`
      
      const response = chatResponses.get(testChatId)
      
      return NextResponse.json({
        found: !!response,
        response: response || null,
        totalResponses: chatResponses.size,
        allChatIds: Array.from(chatResponses.keys())
      })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('Test endpoint error:', error)
    return NextResponse.json({ 
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Show test instructions
    return NextResponse.json({
      message: 'Telegram Test Endpoint',
      instructions: {
        step1: 'POST with { "action": "send_test", "chatId": "YOUR_CHAT_ID", "message": "Test message" }',
        step2: 'Reply to the message in Telegram',
        step3: 'POST with { "action": "check_responses", "chatId": "YOUR_CHAT_ID" }',
        note: 'Replace YOUR_CHAT_ID with your actual Telegram chat ID'
      },
      endpoints: {
        health: '/api/telegram/health',
        debug: '/api/telegram/debug',
        webhook: '/api/telegram/webhook',
        setup: '/admin/telegram-setup'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to show instructions' }, { status: 500 })
  }
}
