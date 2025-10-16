
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting auto-setup for vonnect.net...')
    
    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ 
        success: false,
        error: 'TELEGRAM_BOT_TOKEN not configured' 
      }, { status: 500 })
    }

    // Step 1: Get recent updates to find your chat ID
    console.log('📥 Getting recent updates...')
    const getUpdatesResponse = await fetch(`${TELEGRAM_API_URL}/getUpdates?limit=100`)
    const updates = await getUpdatesResponse.json()
    
    if (!updates.ok || updates.result.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'No recent messages found. Please send a message to @inmerzorrillabot first.',
        step: 'get_updates'
      }, { status: 400 })
    }

    // Find your chat ID (most recent human message)
    const recentMessages = updates.result
      .filter((update: any) => update.message && update.message.from && update.message.from.is_bot === false)
      .sort((a: any, b: any) => b.message.date - a.message.date)
    
    if (recentMessages.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'No human messages found. Please send a message to @inmerzorrillabot first.',
        step: 'find_human_messages'
      }, { status: 400 })
    }

    const yourChatId = recentMessages[0].message.from.id.toString()
    const userName = recentMessages[0].message.from.first_name
    console.log('✅ Found your chat ID:', yourChatId, '(' + userName + ')')

    // Step 2: Set webhook for vonnect.net
    console.log('🌐 Setting webhook for vonnect.net...')
    const webhookUrl = 'https://vonnect.net/api/telegram/webhook'
    
    const setWebhookResponse = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message'],
        drop_pending_updates: true
      })
    })

    const webhookResult = await setWebhookResponse.json()
    
    if (!webhookResult.ok) {
      return NextResponse.json({ 
        success: false,
        error: 'Failed to set webhook',
        details: webhookResult,
        step: 'set_webhook'
      }, { status: 400 })
    }

    console.log('✅ Webhook configured successfully!')

    // Step 3: Send test message
    console.log('📤 Sending test message...')
    const testMessage = `🎉 *Bot Configurado Exitosamente*\n\nTu Chat ID: \`${yourChatId}\`\nWebhook: \`${webhookUrl}\`\n\n✅ El bot ya está listo para funcionar en vonnect.net!\n\nAhora puedes recibir mensajes del chat widget directamente aquí.`
    
    const sendTestResponse = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: yourChatId,
        text: testMessage,
        parse_mode: 'Markdown'
      })
    })

    const testResult = await sendTestResponse.json()
    
    return NextResponse.json({ 
      success: true,
      message: 'Bot configured successfully!',
      data: {
        chatId: yourChatId,
        userName: userName,
        webhookUrl: webhookUrl,
        testMessageSent: testResult.ok
      }
    })

  } catch (error) {
    console.error('❌ Auto-setup error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check current status
    const webhookResponse = await fetch(`${TELEGRAM_API_URL}/getWebhookInfo`)
    const webhookInfo = await webhookResponse.json()
    
    return NextResponse.json({
      success: true,
      webhook: {
        isConfigured: webhookInfo.ok && webhookInfo.result.url !== "",
        currentUrl: webhookInfo.result?.url || 'Not set',
        isVonnectUrl: webhookInfo.result?.url?.includes('vonnect.net') || false
      },
      botToken: TELEGRAM_BOT_TOKEN ? 'Configured' : 'Not configured'
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Failed to check status'
    }, { status: 500 })
  }
}
