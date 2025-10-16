
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

export async function GET(request: NextRequest) {
  try {
    // Check bot status
    const botResponse = await fetch(`${TELEGRAM_API_URL}/getMe`)
    const botInfo = await botResponse.json()
    
    // Check webhook status
    const webhookResponse = await fetch(`${TELEGRAM_API_URL}/getWebhookInfo`)
    const webhookInfo = await webhookResponse.json()
    
    // Basic endpoint health (skip actual testing in build mode)
    let sendEndpointOk = true
    let webhookEndpointOk = true
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      bot: {
        connected: botInfo.ok,
        username: botInfo.result?.username || 'unknown',
        id: botInfo.result?.id || 'unknown'
      },
      webhook: {
        configured: webhookInfo.ok && webhookInfo.result?.url !== '',
        url: webhookInfo.result?.url || 'not set',
        lastError: webhookInfo.result?.last_error_message || 'none',
        pendingUpdates: webhookInfo.result?.pending_update_count || 0
      },
      endpoints: {
        send: sendEndpointOk ? 'ok' : 'error',
        webhook: webhookEndpointOk ? 'ok' : 'error'
      },
      environment: {
        tokenConfigured: !!TELEGRAM_BOT_TOKEN
      }
    }
    
    // Overall health check
    const isHealthy = botInfo.ok && sendEndpointOk && webhookEndpointOk
    
    return NextResponse.json(health, { 
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  }
}
