
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'setWebhook') {
      // Set webhook (for production, you'd use your actual domain)
      const webhookUrl = `${process.env.NEXTAUTH_URL || 'https://your-domain.com'}/api/telegram/webhook`
      
      const response = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl
        })
      })
      
      const result = await response.json()
      return NextResponse.json(result)
    }
    
    if (action === 'getUpdates') {
      // Get recent updates to find your chat ID
      const response = await fetch(`${TELEGRAM_API_URL}/getUpdates`)
      const result = await response.json()
      
      return NextResponse.json(result)
    }
    
    if (action === 'sendTestMessage') {
      // Send a test message to help identify your chat ID
      const testMessage = "🤖 *Configuración del Chat Bot de Vonnect*\n\nSi recibes este mensaje, el bot está configurado correctamente.\n\nResponde con cualquier mensaje para confirmar la conexión."
      
      // We need to try different methods to get your chat ID
      const updatesResponse = await fetch(`${TELEGRAM_API_URL}/getUpdates`)
      const updates = await updatesResponse.json()
      
      if (updates.ok && updates.result.length > 0) {
        // Find the most recent message from you
        const recentChats = updates.result
          .map((update: any) => update.message)
          .filter((msg: any) => msg && msg.from)
          .sort((a: any, b: any) => b.date - a.date)
        
        if (recentChats.length > 0) {
          const yourChatId = recentChats[0].from.id
          
          const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: yourChatId,
              text: testMessage,
              parse_mode: 'Markdown'
            })
          })
          
          const result = await response.json()
          return NextResponse.json({ success: true, chatId: yourChatId, result })
        }
      }
      
      return NextResponse.json({ 
        success: false, 
        message: 'No recent messages found. Please send a message to your bot first.' 
      })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get bot info
    const response = await fetch(`${TELEGRAM_API_URL}/getMe`)
    const botInfo = await response.json()
    
    // Get webhook info
    const webhookResponse = await fetch(`${TELEGRAM_API_URL}/getWebhookInfo`)
    const webhookInfo = await webhookResponse.json()
    
    return NextResponse.json({
      botInfo,
      webhookInfo,
      token: TELEGRAM_BOT_TOKEN ? 'Configured' : 'Missing'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get bot info' }, { status: 500 })
  }
}
