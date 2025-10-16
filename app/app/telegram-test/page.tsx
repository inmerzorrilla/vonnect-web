
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function TelegramTestPage() {
  const [chatId, setChatId] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [debugInfo, setDebugInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const testSendMessage = async () => {
    if (!chatId || !message) {
      alert('Por favor ingresa chatId y mensaje')
      return
    }

    setIsLoading(true)
    try {
      const result = await fetch('/api/telegram/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          message,
          userName: 'Test User',
          userPhone: '+1234567890',
          userEmail: 'test@test.com'
        })
      })
      
      const data = await result.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const simulateReply = async () => {
    if (!chatId) {
      alert('Por favor ingresa chatId')
      return
    }

    setIsLoading(true)
    try {
      const result = await fetch('/api/telegram/simulate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          message: '¡Esta es una respuesta simulada de prueba!',
          from: 'Test Support'
        })
      })
      
      const data = await result.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const checkResponse = async () => {
    if (!chatId) {
      alert('Por favor ingresa chatId')
      return
    }

    setIsLoading(true)
    try {
      const result = await fetch(`/api/telegram/webhook?chatId=${chatId}`)
      const data = await result.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const getDebugInfo = async () => {
    setIsLoading(true)
    try {
      const result = await fetch('/api/telegram/debug')
      const data = await result.json()
      setDebugInfo(JSON.stringify(data, null, 2))
    } catch (error) {
      setDebugInfo(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const clearResponses = async () => {
    setIsLoading(true)
    try {
      const result = await fetch('/api/telegram/debug', { method: 'DELETE' })
      const data = await result.json()
      setDebugInfo(JSON.stringify(data, null, 2))
    } catch (error) {
      setDebugInfo(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Telegram Integration Test Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Test Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Chat ID:</label>
            <Input
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="chat_1234567890_abc123"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Usa el chatId del widget o genéralo con formato: chat_[timestamp]_[random]
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Test Message:</label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mensaje de prueba"
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={testSendMessage} 
              disabled={isLoading}
              className="w-full"
            >
              1. Send Message to Telegram
            </Button>
            
            <Button 
              onClick={simulateReply} 
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              2. Simulate Reply from Telegram
            </Button>
            
            <Button 
              onClick={checkResponse} 
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              3. Check for Response
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={getDebugInfo} 
              disabled={isLoading}
              variant="secondary"
              className="w-full"
            >
              Get Debug Info
            </Button>
            
            <Button 
              onClick={clearResponses} 
              disabled={isLoading}
              variant="destructive"
              className="w-full"
            >
              Clear All Responses
            </Button>
          </div>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              {response}
            </pre>
          </CardContent>
        </Card>
      )}

      {debugInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              {debugInfo}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Step 1:</strong> Ingresa un chatId (por ejemplo: chat_1234567890_abc123)</p>
          <p><strong>Step 2:</strong> Ingresa un mensaje de prueba</p>
          <p><strong>Step 3:</strong> Haz clic en "Send Message to Telegram" - esto debe enviar el mensaje a tu Telegram</p>
          <p><strong>Step 4:</strong> Haz clic en "Simulate Reply from Telegram" - esto simula una respuesta de Telegram</p>
          <p><strong>Step 5:</strong> Haz clic en "Check for Response" - esto verifica si hay respuestas pendientes</p>
          <p className="text-muted-foreground mt-4">
            También puedes usar "Get Debug Info" para ver todas las respuestas almacenadas en memoria.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
