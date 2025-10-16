
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

export async function GET(request: NextRequest) {
  try {
    // Get recent updates to find your chat ID
    const getUpdatesResponse = await fetch(`${TELEGRAM_API_URL}/getUpdates?limit=100`)
    const updates = await getUpdatesResponse.json()
    
    if (!updates.ok) {
      return NextResponse.json({ 
        error: 'Failed to get updates from Telegram',
        details: updates 
      }, { status: 500 })
    }

    if (updates.result.length === 0) {
      return NextResponse.json({ 
        error: 'No messages found. Please send a message to your bot @inmerzorrillabot first.',
        instructions: 'Go to Telegram and send any message to @inmerzorrillabot, then try again.'
      }, { status: 400 })
    }

    // Find all unique chat IDs from recent messages (exclude bots)
    const chatIds = updates.result
      .filter((update: any) => update.message && update.message.from && update.message.from.is_bot === false)
      .map((update: any) => ({
        chatId: update.message.from.id,
        firstName: update.message.from.first_name,
        lastName: update.message.from.last_name,
        username: update.message.from.username,
        messageText: update.message.text?.substring(0, 50) + '...',
        date: new Date(update.message.date * 1000).toISOString(),
        isBot: update.message.from.is_bot || false
      }))
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Remove duplicates by chatId
    const uniqueChats = chatIds.filter((chat: any, index: number, self: any) => 
      index === self.findIndex((c: any) => c.chatId === chat.chatId)
    )

    return NextResponse.json({
      success: true,
      totalUpdates: updates.result.length,
      uniqueChats,
      mostRecentChatId: uniqueChats[0]?.chatId,
      instructions: 'Use the mostRecentChatId if it corresponds to your personal account.'
    })

  } catch (error) {
    console.error('Error getting chat ID:', error)
    return NextResponse.json({ 
      error: 'Failed to get chat ID',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { setChatId } = await request.json()
    
    if (!setChatId) {
      return NextResponse.json({ error: 'Missing setChatId parameter' }, { status: 400 })
    }

    // Test sending a message to verify the chat ID
    const testMessage = `✅ *Chat ID Configurado Correctamente*\n\nTu Chat ID ${setChatId} ha sido configurado para recibir mensajes del chat widget de vonnect.net\n\n🎉 ¡El sistema ya está listo para funcionar!`
    
    const telegramResponse = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: setChatId,
        text: testMessage,
        parse_mode: 'Markdown'
      })
    })

    const result = await telegramResponse.json()

    if (!result.ok) {
      return NextResponse.json({ 
        error: 'Failed to send test message. Invalid chat ID.',
        details: result 
      }, { status: 400 })
    }

    // Here you would normally save the chat ID to your database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Chat ID configured successfully!',
      chatId: setChatId,
      testMessageId: result.result.message_id
    })

  } catch (error) {
    console.error('Error setting chat ID:', error)
    return NextResponse.json({ 
      error: 'Failed to set chat ID',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
