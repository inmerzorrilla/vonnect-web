
import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Eres el asistente virtual de Vonnect, una empresa líder en reclutamiento de talento tecnológico y soluciones digitales. Tu misión es ayudar a los visitantes proporcionando información precisa y útil sobre nuestros servicios.

INFORMACIÓN SOBRE VONNECT:
- Especialistas en contratación remota de desarrolladores y profesionales de tecnología
- Ofrecemos desarrollo de software personalizado y consultoría estratégica
- Conectamos empresas con talento tech de alta calidad a nivel global
- Priorizamos las conexiones auténticas y el ajuste cultural, no solo las habilidades técnicas
- Ayudamos a startups y PYMEs a desbloquear su potencial completo

SERVICIOS PRINCIPALES:
1. Reclutamiento Remoto: Contratación de desarrolladores, ingenieros de software, y especialistas en tecnología
2. Desarrollo de Software: Soluciones personalizadas para web, móvil y sistemas empresariales
3. Consultoría Estratégica: Asesoría en transformación digital y arquitectura tecnológica
4. Red de Talento: Acceso a una comunidad global de profesionales tech

CONTACTO:
- Email: info@vonnect.net
- Teléfono: +525578910193
- Sitio web: https://vonnect.net

IDIOMAS:
- Responde en español cuando el usuario escriba en español
- Responde en inglés cuando el usuario escriba en inglés
- Mantén un tono profesional pero amigable

INSTRUCCIONES:
- Proporciona respuestas claras y concisas
- Si no tienes información específica, ofrece ponerse en contacto con el equipo
- Menciona los beneficios únicos de Vonnect cuando sea relevante
- Invita a explorar los servicios o contactar para más información
- Nunca inventes información que no esté en este prompt`

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversation = [] } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ 
        success: false,
        error: 'Message is required' 
      }, { status: 400 })
    }

    // Build conversation history with system prompt
    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversation.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ]

    console.log('🤖 Sending request to Abacus AI...')
    
    // Call Abacus AI API
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: messages,
        stream: true,
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      console.error('❌ Abacus AI API error:', response.status, response.statusText)
      return NextResponse.json({
        success: false,
        error: 'Failed to get AI response'
      }, { status: 500 })
    }

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()
        
        if (!reader) {
          throw new Error('No reader available')
        }
        
        try {
          let fullResponse = ''
          
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  // Send final response
                  const finalData = JSON.stringify({
                    success: true,
                    message: fullResponse.trim(),
                    isComplete: true
                  })
                  controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
                  return
                }
                
                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content || ''
                  if (content) {
                    fullResponse += content
                    // Send streaming chunk
                    const chunkData = JSON.stringify({
                      success: true,
                      chunk: content,
                      message: fullResponse,
                      isComplete: false
                    })
                    controller.enqueue(encoder.encode(`data: ${chunkData}\n\n`))
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('❌ Stream error:', error)
          const errorData = JSON.stringify({
            success: false,
            error: 'Stream processing failed'
          })
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
          controller.error(error)
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })

  } catch (error) {
    console.error('❌ Chat API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}
