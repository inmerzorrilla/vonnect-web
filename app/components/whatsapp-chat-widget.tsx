
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/use-language'
import { 
  MessageCircle, 
  X, 
  Send, 
  User,
  Clock,
  Bot,
  Sparkles
} from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  status?: 'sending' | 'sent' | 'typing'
}

interface WhatsAppChatWidgetProps {
  isOpen?: boolean
  onClose?: () => void
}

export function WhatsAppChatWidget({ isOpen: controlledIsOpen, onClose }: WhatsAppChatWidgetProps = {}) {
  const { t, language } = useLanguage()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = controlledIsOpen !== undefined ? (open: boolean) => {
    if (!open && onClose) onClose()
  } : setInternalIsOpen
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: language === 'es' 
          ? '¡Hola! 👋 Soy el asistente virtual de Vonnect. Estoy aquí para ayudarte con información sobre nuestros servicios de reclutamiento tech y desarrollo de software. ¿En qué puedo ayudarte hoy?'
          : 'Hello! 👋 I\'m Vonnect\'s virtual assistant. I\'m here to help you with information about our tech recruitment and software development services. How can I help you today?',
        isUser: false,
        timestamp: new Date(),
        status: 'sent'
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, language])

  // Send message to AI chatbot
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
      status: 'sending'
    }

    // Add user message
    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage.trim()
    setInputMessage('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      console.log('🤖 Sending message to AI chatbot...')

      // Mark user message as sent
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
      ))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversation: messages.slice(-10) // Send last 10 messages for context
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let partialRead = ''
      let aiMessage: Message | null = null

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        partialRead += decoder.decode(value, { stream: true })
        const lines = partialRead.split('\n')
        partialRead = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            try {
              const parsed = JSON.parse(data)
              
              if (parsed.success && parsed.message) {
                if (!aiMessage) {
                  // Create AI message on first chunk
                  aiMessage = {
                    id: (Date.now() + 1).toString(),
                    text: parsed.message,
                    isUser: false,
                    timestamp: new Date(),
                    status: parsed.isComplete ? 'sent' : 'typing'
                  }
                  setMessages(prev => [...prev, aiMessage!])
                } else {
                  // Update existing message
                  setMessages(prev => prev.map(msg => 
                    msg.id === aiMessage!.id 
                      ? { ...msg, text: parsed.message, status: parsed.isComplete ? 'sent' : 'typing' }
                      : msg
                  ))
                }
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

    } catch (error) {
      console.error('❌ Error sending message to AI:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'es' 
          ? '❌ Lo siento, ha ocurrido un error. Por favor intenta nuevamente o contacta a nuestro equipo en info@vonnect.net'
          : '❌ Sorry, an error occurred. Please try again or contact our team at info@vonnect.net',
        isUser: false,
        timestamp: new Date(),
        status: 'sent'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-3 h-3 text-blue-500" />
      case 'typing':
        return <Bot className="w-3 h-3 text-blue-500 animate-pulse" />
      default:
        return <Clock className="w-3 h-3 text-gray-400" />
    }
  }

  // Show floating button only when not controlled externally
  const showFloatingButton = controlledIsOpen === undefined

  return (
    <>
      {/* Chat Toggle Button - only show if not controlled */}
      {showFloatingButton && (
        <motion.button
          className="fixed bottom-6 right-6 z-[90] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #348FBE, #5090DE)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          animate={isOpen ? {} : { 
            boxShadow: [
              '0 0 0 0 rgba(37, 211, 102, 0.4)',
              '0 0 0 20px rgba(37, 211, 102, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[89] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-7rem)] min-h-[28rem] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col w-80 sm:w-80 sm:right-6 max-sm:right-6 max-sm:left-6 max-sm:w-auto"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {language === 'es' ? 'Asistente IA de Vonnect' : 'Vonnect AI Assistant'}
                  </h3>
                  <p className="text-xs text-blue-100">
                    {language === 'es' ? 'En línea ahora • Respuestas instantáneas' : 'Online now • Instant responses'}
                  </p>
                </div>
                {/* Close button - always visible in header */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-500 text-white ml-8'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-8 shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <div className={`flex items-center mt-1 space-x-1 ${
                      message.isUser ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.isUser && (
                        <div className="ml-1">
                          {getStatusIcon(message.status)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl mr-8 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex-shrink-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                  className="flex-1 rounded-full border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={sendMessage}
                    className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
