
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

// Store recent messages for chat responses - In production, use a database
// Using global storage to persist across requests
const chatResponses = (globalThis as any).__telegram_responses || ((globalThis as any).__telegram_responses = new Map())
const responseTimestamps = (globalThis as any).__telegram_timestamps || ((globalThis as any).__telegram_timestamps = new Map())

// Cleanup old responses every 5 minutes (only set interval once)
if (!(globalThis as any).__telegram_cleanup_interval) {
  (globalThis as any).__telegram_cleanup_interval = setInterval(() => {
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000)
    let cleaned = 0
    for (const [chatId, timestamp] of responseTimestamps.entries()) {
      if (timestamp < fiveMinutesAgo) {
        chatResponses.delete(chatId)
        responseTimestamps.delete(chatId)
        cleaned++
      }
    }
    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} old responses. Remaining: ${chatResponses.size}`)
    }
  }, 5 * 60 * 1000)
}

export async function POST(request: NextRequest) {
  try {
    // Always return 200 OK to Telegram, regardless of processing errors
    const update = await request.json()
    console.log('Webhook received update:', JSON.stringify(update, null, 2))
    
    // Handle incoming messages (your responses)
    if (update.message && update.message.text) {
      const messageText = update.message.text
      const fromId = update.message.from.id
      const chatId = update.message.chat.id
      
      console.log(`Received message from ${fromId}: ${messageText}`)
      
      // Check if this is a reply to a web chat message
      if (update.message.reply_to_message) {
        const originalMessage = update.message.reply_to_message.text
        console.log('Reply to message:', originalMessage)
        
        // Extract web chat ID from the original message
        console.log(`🔍 Looking for chat ID in original message: "${originalMessage}"`)
        const chatIdMatch = originalMessage.match(/📱 ID: (.+)\n/)
        if (chatIdMatch) {
          const webChatId = chatIdMatch[1].trim()
          console.log(`🎯 Extracted web chat ID: "${webChatId}"`)
          
          // Store the response for the web chat
          const responseData = {
            message: messageText,
            timestamp: Date.now(),
            messageId: update.message.message_id,
            from: update.message.from.first_name || 'Support'
          }
          
          chatResponses.set(webChatId, responseData)
          responseTimestamps.set(webChatId, Date.now())
          
          console.log(`✅ Response stored for web chat "${webChatId}": ${messageText}`)
          console.log(`✅ Total responses in memory: ${chatResponses.size}`)
          console.log(`🗂️ All stored chat IDs: ${Array.from(chatResponses.keys()).join(', ')}`)
          
          // Send confirmation back to Telegram (don't await, fire and forget)
          fetch(`${TELEGRAM_API_URL}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `✅ Respuesta enviada al chat web: "${messageText}"`,
              reply_to_message_id: update.message.message_id
            })
          }).catch(err => console.error('Failed to send confirmation:', err))
        } else {
          console.log('No web chat ID found in original message')
        }
      } else {
        // This is a direct message, not a reply
        console.log('Direct message (not a reply to web chat)')
        
        // Send an auto-response explaining how to use the bot (don't await, fire and forget)
        fetch(`${TELEGRAM_API_URL}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `👋 ¡Hola! Este es el bot de soporte de Vonnect.\n\n💬 Para responder a los mensajes del sitio web, simplemente RESPONDE a los mensajes que te envío con formato "💬 Nuevo mensaje desde vonnect.net"\n\n🔧 Si necesitas ayuda, contacta al administrador.`
          })
        }).catch(err => console.error('Failed to send auto-response:', err))
      }
    }
    
    // Always return 200 OK to Telegram
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    // Even on error, return 200 OK to prevent Telegram retries
    return NextResponse.json({ ok: true }, { status: 200 })
  }
}

// Get responses for a specific chat
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get('chatId')
    
    console.log(`🔍 GET request for chatId: "${chatId}"`)
    
    if (!chatId) {
      console.log('❌ Missing chatId in GET request')
      return NextResponse.json({ error: 'Missing chatId', response: null }, { status: 200 })
    }
    
    console.log(`📊 Current stored responses: ${chatResponses.size} total`)
    console.log(`🗂️ Available chat IDs: [${Array.from(chatResponses.keys()).join(', ')}]`)
    
    const response = chatResponses.get(chatId)
    if (response) {
      // Remove the response after retrieving it
      chatResponses.delete(chatId)
      responseTimestamps.delete(chatId)
      console.log(`✅ FOUND and removed response for chat "${chatId}":`, response.message)
      console.log(`✅ Remaining responses in memory: ${chatResponses.size}`)
      return NextResponse.json({ response }, { status: 200 })
    }
    
    // No response found - this is normal
    console.log(`🚫 No response found for chat "${chatId}"`)
    return NextResponse.json({ response: null }, { status: 200 })
  } catch (error) {
    console.error('GET webhook error:', error)
    // Always return a valid JSON response, even on error
    return NextResponse.json({ response: null, error: 'Internal error' }, { status: 200 })
  }
}
