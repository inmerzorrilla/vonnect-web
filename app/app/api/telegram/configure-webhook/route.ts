
import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

export async function POST(request: NextRequest) {
  try {
    const { webhookUrl } = await request.json()
    
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Missing webhookUrl parameter' }, { status: 400 })
    }

    console.log('Setting webhook URL:', webhookUrl)

    // Set the webhook
    const response = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message'],
        drop_pending_updates: true
      })
    })

    const result = await response.json()
    console.log('Webhook setup response:', result)

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Webhook configured successfully!',
        webhookUrl,
        result
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to configure webhook',
        details: result
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Error configuring webhook:', error)
    return NextResponse.json({ 
      error: 'Failed to configure webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get current webhook info
    const response = await fetch(`${TELEGRAM_API_URL}/getWebhookInfo`)
    const webhookInfo = await response.json()
    
    return NextResponse.json({
      success: true,
      webhookInfo,
      isConfigured: webhookInfo.ok && webhookInfo.result.url !== "",
      currentUrl: webhookInfo.result?.url || 'Not set'
    })

  } catch (error) {
    console.error('Error getting webhook info:', error)
    return NextResponse.json({ 
      error: 'Failed to get webhook info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    // Delete/remove the webhook
    const response = await fetch(`${TELEGRAM_API_URL}/deleteWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        drop_pending_updates: true
      })
    })

    const result = await response.json()
    
    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Webhook removed successfully!',
        result
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to remove webhook',
        details: result
      }, { status: 400 })
    }

  } catch (error) {
    console.error('Error removing webhook:', error)
    return NextResponse.json({ 
      error: 'Failed to remove webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
