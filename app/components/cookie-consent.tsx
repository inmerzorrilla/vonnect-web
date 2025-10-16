
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/hooks/use-language'
import { Cookie, X, Settings, Shield, Eye } from 'lucide-react'
import Link from 'next/link'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    const consent = localStorage.getItem('vonnect-cookie-consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptAllCookies = () => {
    localStorage.setItem('vonnect-cookie-consent', 'all')
    setShowConsent(false)
  }

  const acceptNecessaryOnly = () => {
    localStorage.setItem('vonnect-cookie-consent', 'necessary')
    setShowConsent(false)
  }

  const rejectAll = () => {
    localStorage.setItem('vonnect-cookie-consent', 'rejected')
    setShowConsent(false)
  }

  const cookieTexts = {
    en: {
      title: "We value your privacy",
      description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
      acceptAll: "Accept All",
      acceptNecessary: "Necessary Only",
      reject: "Reject All",
      customize: "Customize",
      learnMore: "Learn more in our",
      privacyPolicy: "Privacy Policy",
      cookieTypes: {
        necessary: {
          title: "Strictly Necessary",
          description: "Essential for the website to function properly"
        },
        analytics: {
          title: "Analytics & Performance",
          description: "Help us understand how visitors interact with our site"
        },
        marketing: {
          title: "Marketing & Advertising",
          description: "Used to deliver relevant content and track ad performance"
        }
      }
    },
    es: {
      title: "Valoramos tu privacidad",
      description: "Utilizamos cookies para mejorar tu experiencia de navegación, ofrecer contenido personalizado y analizar nuestro tráfico. Al hacer clic en 'Aceptar todo', consientes nuestro uso de cookies.",
      acceptAll: "Aceptar todo",
      acceptNecessary: "Solo necesarias",
      reject: "Rechazar todo",
      customize: "Personalizar",
      learnMore: "Más información en nuestra",
      privacyPolicy: "Política de Privacidad",
      cookieTypes: {
        necessary: {
          title: "Estrictamente necesarias",
          description: "Esenciales para que el sitio web funcione correctamente"
        },
        analytics: {
          title: "Análisis y rendimiento",
          description: "Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio"
        },
        marketing: {
          title: "Marketing y publicidad",
          description: "Se usan para entregar contenido relevante y rastrear el rendimiento de los anuncios"
        }
      }
    }
  }

  const texts = cookieTexts[language] || cookieTexts.en

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
        >
          <Card className="max-w-5xl mx-auto bg-background/95 backdrop-blur-lg border border-border shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <Cookie className="w-8 h-8 text-orange-500" />
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {texts.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {texts.description}
                  </p>
                  
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 mb-4"
                    >
                      {Object.entries(texts.cookieTypes).map(([key, type]) => (
                        <div key={key} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/30">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{type.title}</h4>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button
                      onClick={acceptAllCookies}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                      size="sm"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {texts.acceptAll}
                    </Button>
                    
                    <Button
                      onClick={acceptNecessaryOnly}
                      variant="outline"
                      size="sm"
                    >
                      {texts.acceptNecessary}
                    </Button>
                    
                    <Button
                      onClick={rejectAll}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      {texts.reject}
                    </Button>
                    
                    <Button
                      onClick={() => setShowDetails(!showDetails)}
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {texts.customize}
                    </Button>
                    
                    <div className="text-xs text-muted-foreground">
                      {texts.learnMore}{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        {texts.privacyPolicy}
                      </Link>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConsent(false)}
                  className="flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
