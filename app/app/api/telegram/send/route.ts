
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

// We'll store active conversations in memory for simplicity
// In production, you'd want to use a database
const activeChats = new Map()

export async function POST(request: NextRequest) {
  try {
    // Check if bot is configured
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('❌ TELEGRAM_BOT_TOKEN not configured')
      return NextResponse.json({ 
        success: false,
        error: 'Bot not configured',
        details: 'TELEGRAM_BOT_TOKEN environment variable is missing'
      }, { status: 200 })
    }

    const { message, chatId, userName, userPhone, userEmail } = await request.json()
    
    if (!message || !chatId) {
      console.error('❌ Missing message or chatId:', { message: !!message, chatId: !!chatId })
      return NextResponse.json({ 
        success: false,
        error: 'Missing message or chatId' 
      }, { status: 200 })
    }

    // Get your Telegram chat ID from environment or auto-detect
    let telegramChatId = process.env.TELEGRAM_CHAT_ID
    
    console.log('🔧 Telegram Chat ID from env:', telegramChatId ? 'Set' : 'Not set')
    
    if (!telegramChatId) {
      console.log('🔍 Auto-detecting Telegram Chat ID...')
      // Get your chat ID from recent updates
      const getUpdatesResponse = await fetch(`${TELEGRAM_API_URL}/getUpdates?limit=100`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (!getUpdatesResponse.ok) {
        console.error('❌ Failed to get updates from Telegram API:', getUpdatesResponse.status)
        return NextResponse.json({ 
          success: false,
          error: 'Failed to connect to Telegram API',
          details: `HTTP ${getUpdatesResponse.status}: ${getUpdatesResponse.statusText}`
        }, { status: 200 })
      }
      
      const updates = await getUpdatesResponse.json()
      console.log('📥 Telegram updates response:', { ok: updates.ok, count: updates.result?.length || 0 })
      
      if (updates.ok && updates.result.length > 0) {
        // Look for the most recent message to get your chat ID
        const recentMessages = updates.result
          .filter((update: any) => update.message && update.message.from && update.message.from.is_bot === false)
          .sort((a: any, b: any) => b.message.date - a.message.date)
        
        console.log('📥 Found', recentMessages.length, 'recent user messages')
        
        if (recentMessages.length > 0) {
          // Use the most recent chat ID from a human user (not bot)
          telegramChatId = recentMessages[0].message.from.id.toString()
          console.log('✅ Auto-detected chat ID:', telegramChatId)
          console.log('👤 User:', recentMessages[0].message.from.first_name, recentMessages[0].message.from.last_name || '')
        } else {
          // Fallback: try to find by looking for specific usernames or patterns
          const allMessages = updates.result.filter((update: any) => 
            update.message && 
            update.message.from && 
            update.message.from.is_bot === false
          )
          
          if (allMessages.length > 0) {
            // Use the first human message found
            telegramChatId = allMessages[0].message.from.id.toString()
            console.log('✅ Fallback: Using chat ID:', telegramChatId)
          }
        }
      }
      
      if (!telegramChatId) {
        console.error('❌ Could not determine Telegram chat ID')
        return NextResponse.json({ 
          success: false,
          error: 'Could not determine your Telegram chat ID. Please send a message to your bot @inmerzorrillabot first.',
          details: 'No recent messages found in bot updates'
        }, { status: 200 })
      }
    }

    // Store the conversation mapping
    activeChats.set(chatId, {
      telegramChatId,
      userName,
      userPhone,
      userEmail,
      lastActivity: Date.now()
    })

    // Format message for Telegram with contact info
    const contactInfo = []
    if (userPhone && userPhone !== 'No proporcionado') contactInfo.push(`📞 ${userPhone}`)
    if (userEmail && userEmail !== 'No proporcionado') contactInfo.push(`📧 ${userEmail}`)
    
    const contactString = contactInfo.length > 0 ? `\n${contactInfo.join('\n')}` : ''
    
    const formattedMessage = `💬 *Nuevo mensaje desde vonnect.net*\n\n👤 Usuario: ${userName || 'Anónimo'}${contactString}\n📱 ID: ${chatId}\n\n📝 Mensaje:\n"${message}"\n\n_Responde a este mensaje y aparecerá automáticamente en el chat del sitio web._`

    // Send message to your Telegram
    console.log('📤 Sending message to Telegram chat ID:', telegramChatId)
    console.log('📝 Formatted message length:', formattedMessage.length)
    
    const telegramResponse = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: formattedMessage,
        parse_mode: 'Markdown'
      })
    })
    
    console.log('🌐 Telegram API response status:', telegramResponse.status)

    const result = await telegramResponse.json()
    console.log('Telegram API response:', result)

    if (!result.ok) {
      console.error('Telegram API Error:', result)
      return NextResponse.json({ 
        success: false,
        error: 'Failed to send message to Telegram', 
        details: result.description || 'Unknown error',
        chatId: telegramChatId 
      }, { status: 200 }) // Return 200 to prevent client-side errors
    }

    return NextResponse.json({ 
      success: true, 
      messageId: result.result?.message_id || 'unknown',
      status: 'sent'
    }, { status: 200 })

  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 }) // Return 200 to prevent client-side errors
  }
}

// Get active chats (for debugging)
export async function GET() {
  return NextResponse.json({
    activeChats: Array.from(activeChats.entries()),
    botToken: TELEGRAM_BOT_TOKEN ? 'Set' : 'Not set'
  })
}
