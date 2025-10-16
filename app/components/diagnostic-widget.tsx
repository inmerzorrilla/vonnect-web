
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, MessageSquare, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

export function DiagnosticWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    // Mostrar el widget después de 3 segundos
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  const handleDiagnostic = () => {
    window.open('https://diagnostico.abacusai.app/', '_blank')
    setIsVisible(false)
    setIsDismissed(true)
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm"
        >
          <Card className="shadow-2xl border-0" style={{ background: 'linear-gradient(to bottom right, #348FBE, #5090DE)' }}>
            <CardContent className="p-4 text-white">
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon */}
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    {language === 'es' 
                      ? '🚀 ¡Diagnóstico Empresarial Gratuito!' 
                      : '🚀 Free Business Diagnostic!'
                    }
                  </h3>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm mb-4 leading-relaxed">
                {language === 'es' 
                  ? 'Descubre el potencial oculto de tu empresa en solo 5 minutos. Obtén insights personalizados sobre tecnología, procesos y crecimiento.'
                  : 'Discover your company\'s hidden potential in just 5 minutes. Get personalized insights on technology, processes, and growth.'
                }
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleDiagnostic}
                  size="sm"
                  className="bg-white text-blue-600 hover:bg-white/90 font-semibold flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {language === 'es' ? 'Iniciar Diagnóstico' : 'Start Diagnostic'}
                </Button>
              </div>

              {/* Small text */}
              <p className="text-xs text-white/80 mt-2 text-center">
                {language === 'es' ? 'Completamente gratuito • Sin compromiso' : 'Completely free • No commitment'}
              </p>
            </CardContent>
          </Card>

          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(52, 143, 190, 0.4)',
                '0 0 0 20px rgba(52, 143, 190, 0)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
