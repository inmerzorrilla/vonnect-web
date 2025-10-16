
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react'

interface ChatInfo {
  chatId: number
  firstName: string
  lastName?: string
  username?: string
  messageText: string
  date: string
}

interface WebhookInfo {
  isConfigured: boolean
  currentUrl: string
}

export default function TelegramSetupPage() {
  const [loading, setLoading] = useState(false)
  const [chatIds, setChatIds] = useState<ChatInfo[]>([])
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null)
  const [webhookInfo, setWebhookInfo] = useState<WebhookInfo | null>(null)
  const [webhookLoading, setWebhookLoading] = useState(false)
  const [autoSetupLoading, setAutoSetupLoading] = useState(false)

  const getChatIds = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/telegram/get-chat-id')
      const data = await response.json()
      
      if (data.success) {
        setChatIds(data.uniqueChats)
        setSuccess('Chat IDs retrieved successfully!')
      } else {
        setError(data.error || 'Failed to get chat IDs')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const configureChatId = async (chatId: number) => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch('/api/telegram/get-chat-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ setChatId: chatId })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSelectedChatId(chatId)
        setSuccess(`Chat ID ${chatId} configured successfully! Check your Telegram for confirmation.`)
      } else {
        setError(data.error || 'Failed to configure chat ID')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const checkWebhook = async () => {
    try {
      const response = await fetch('/api/telegram/configure-webhook')
      const data = await response.json()
      
      if (data.success) {
        setWebhookInfo({
          isConfigured: data.isConfigured,
          currentUrl: data.currentUrl
        })
      }
    } catch (err) {
      console.error('Failed to check webhook:', err)
    }
  }

  const configureWebhook = async () => {
    setWebhookLoading(true)
    setError('')
    setSuccess('')
    
    try {
      // Use vonnect.net as the webhook domain (production)
      const webhookUrl = `https://vonnect.net/api/telegram/webhook`
      
      const response = await fetch('/api/telegram/configure-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ webhookUrl })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess('Webhook configured successfully! Now you can receive responses from Telegram.')
        await checkWebhook() // Refresh webhook info
      } else {
        setError(data.error || 'Failed to configure webhook')
      }
    } catch (err) {
      setError('Network error occurred while configuring webhook')
    } finally {
      setWebhookLoading(false)
    }
  }

  const removeWebhook = async () => {
    setWebhookLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const response = await fetch('/api/telegram/configure-webhook', {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess('Webhook removed successfully!')
        await checkWebhook() // Refresh webhook info
      } else {
        setError(data.error || 'Failed to remove webhook')
      }
    } catch (err) {
      setError('Network error occurred while removing webhook')
    } finally {
      setWebhookLoading(false)
    }
  }

  const autoSetup = async () => {
    setAutoSetupLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const response = await fetch('/api/telegram/auto-setup', {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSuccess(`🎉 ¡Bot configurado automáticamente! Chat ID: ${data.data.chatId}. Revisa tu Telegram para la confirmación.`)
        setSelectedChatId(data.data.chatId)
        await checkWebhook() // Refresh webhook info
      } else {
        setError(`Error en paso "${data.step || 'unknown'}": ${data.error}`)
      }
    } catch (err) {
      setError('Error de red durante la configuración automática')
    } finally {
      setAutoSetupLoading(false)
    }
  }

  // Check webhook status on component mount
  useEffect(() => {
    checkWebhook()
  }, [])

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Telegram Bot Setup</h1>
        <p className="text-muted-foreground">
          Configure your Telegram chat ID to receive messages from the website chat widget.
        </p>
      </div>

      <Card className="mb-6 border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <span>🚀</span>
            Configuración Automática (Recomendado)
          </CardTitle>
          <CardDescription className="text-green-700">
            Configura todo automáticamente con un solo clic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium mb-2">Antes de continuar:</h4>
              <p className="text-sm text-muted-foreground mb-3">
                1. Ve a Telegram y envía cualquier mensaje a{' '}
                <a 
                  href="https://t.me/inmerzorrillabot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center gap-1"
                >
                  @inmerzorrillabot
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                2. Haz clic en "Configuración Automática" abajo
              </p>
              
              <Button 
                onClick={autoSetup}
                disabled={autoSetupLoading}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {autoSetupLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Configurando automáticamente...
                  </>
                ) : (
                  <>
                    🚀 Configuración Automática
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📋</span>
            Configuración Manual (Opcional)
          </CardTitle>
          <CardDescription>
            Si prefieres configurar paso a paso manualmente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">1</Badge>
            <div>
              <p className="font-medium">Send a message to your bot</p>
              <p className="text-sm text-muted-foreground">
                Go to Telegram and send any message to{' '}
                <a 
                  href="https://t.me/inmerzorrillabot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center gap-1"
                >
                  @inmerzorrillabot
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">2</Badge>
            <div>
              <p className="font-medium">Get your Chat ID</p>
              <p className="text-sm text-muted-foreground">
                Click the button below to retrieve available chat IDs
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">3</Badge>
            <div>
              <p className="font-medium">Configure Webhook for vonnect.net</p>
              <p className="text-sm text-muted-foreground">
                Set up webhook URL to https://vonnect.net/api/telegram/webhook so you can receive responses from Telegram back to the web chat
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Badge variant="outline" className="mt-1">4</Badge>
            <div>
              <p className="font-medium">Select your Chat ID</p>
              <p className="text-sm text-muted-foreground">
                Choose your personal chat ID from the list to complete the setup
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step 2: Get Chat IDs</CardTitle>
          <CardDescription>
            Retrieve all available chat IDs from recent bot interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={getChatIds} 
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Get Chat IDs'
            )}
          </Button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {success && !error && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium">Success</p>
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Step 3: Configure Webhook
            {webhookInfo?.isConfigured ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Configured
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertCircle className="w-3 h-3 mr-1" />
                Not Configured
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Configure the webhook to receive responses from Telegram
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>🎯 Target Webhook URL:</strong> https://vonnect.net/api/telegram/webhook
            </p>
            <p className="text-xs text-blue-600 mt-1">
              This URL will receive notifications when you reply to messages in Telegram
            </p>
          </div>
          
          {webhookInfo && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm">
                <strong>Current Status:</strong>{' '}
                <span className={webhookInfo.isConfigured ? 'text-green-600' : 'text-red-600'}>
                  {webhookInfo.isConfigured ? 'Configured' : 'Not Configured'}
                </span>
              </p>
              {webhookInfo.currentUrl && webhookInfo.currentUrl !== 'Not set' && (
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Current URL:</strong> {webhookInfo.currentUrl}
                </p>
              )}
              {webhookInfo.isConfigured && webhookInfo.currentUrl.includes('vonnect.net') && (
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    ✅ Correctly configured for vonnect.net!
                  </span>
                </div>
              )}
              {webhookInfo.isConfigured && !webhookInfo.currentUrl.includes('vonnect.net') && (
                <div className="flex items-center gap-1 mt-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-600 font-medium">
                    ⚠️ Webhook pointing to wrong domain - needs reconfiguration
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              onClick={configureWebhook} 
              disabled={webhookLoading}
              variant={webhookInfo?.isConfigured ? "outline" : "default"}
            >
              {webhookLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {webhookInfo?.isConfigured ? 'Updating...' : 'Configuring...'}
                </>
              ) : (
                webhookInfo?.isConfigured ? 'Reconfigure Webhook' : 'Configure Webhook'
              )}
            </Button>
            
            {webhookInfo?.isConfigured && (
              <Button 
                onClick={removeWebhook} 
                disabled={webhookLoading}
                variant="destructive"
              >
                {webhookLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Removing...
                  </>
                ) : (
                  'Remove Webhook'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {chatIds.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Select Your Chat ID</CardTitle>
            <CardDescription>
              Choose your personal chat ID from the list below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chatIds.map((chat, index) => (
                <div 
                  key={chat.chatId}
                  className={`p-4 border rounded-lg ${
                    selectedChatId === chat.chatId ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {index === 0 ? "Most Recent" : `${index + 1}`}
                        </Badge>
                        {selectedChatId === chat.chatId && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Configured
                          </Badge>
                        )}
                      </div>
                      <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded inline-block mb-2">
                        ID: {chat.chatId}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-6 w-6 p-0"
                          onClick={() => copyToClipboard(chat.chatId.toString())}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </p>
                      <p className="text-sm">
                        <strong>Name:</strong> {chat.firstName} {chat.lastName || ''}
                        {chat.username && <span className="text-muted-foreground"> (@{chat.username})</span>}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Last message:</strong> {chat.messageText}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(chat.date).toLocaleString()}
                      </p>
                    </div>
                    <Button 
                      onClick={() => configureChatId(chat.chatId)}
                      disabled={loading || selectedChatId === chat.chatId}
                      variant={selectedChatId === chat.chatId ? "outline" : "default"}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : selectedChatId === chat.chatId ? (
                        "Configured"
                      ) : (
                        "Use This ID"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
