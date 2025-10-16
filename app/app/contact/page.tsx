
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/hooks/use-language'
import { Mail, Phone, MapPin, Send, Briefcase, Users, MessageSquare, Clock, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function ContactPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    type: 'GENERAL'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: 'Mensaje Enviado!',
          description: 'Te responderemos dentro de 24 horas.',
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          type: 'GENERAL'
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al enviar mensaje. Por favor intenta de nuevo.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: t('email'),
      value: 'info@vonnect.net',
      href: 'mailto:info@vonnect.net',
      description: 'Respuesta en 24 horas'
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+52 (1) 4462000713',
      href: 'tel:+5214462000713',
      description: 'Lunes a Viernes 9AM - 6PM'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'México',
      href: '#',
      description: 'Servicio internacional'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('contactTitle')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" style={{ color: '#348FBE' }} />
                  Envíanos un mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-4"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="pl-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="pl-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="pl-4"
                      placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full text-white shadow-lg hover:opacity-90" 
                    style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <div key={info.label} className="flex items-start space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(to right, #348FBE20, #5090DE20)' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: '#348FBE' }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <a
                          href={info.href}
                          className="font-medium hover:text-blue-600 transition-colors"
                        >
                          {info.value}
                        </a>
                        <p className="text-xs text-muted-foreground mt-1">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <a href="/companies">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Solicitar Talento
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/candidates">
                    <Users className="w-4 h-4 mr-2" />
                    Únete como Candidato
                  </a>
                </Button>
                
                {/* Google Form Link */}
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg" 
                  asChild
                >
                  <a href="https://forms.gle/nqQyX9jBKYfnzHwW6" target="_blank" rel="noopener noreferrer">
                    <Send className="w-4 h-4 mr-2" />
                    Formulario Detallado
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                </Button>
                
                {/* Chatbot Question */}
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="w-4 h-4 mr-2" style={{ color: '#FFDA6D' }} />
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      💬 ¿Quieres que hagamos un chatbot?
                    </p>
                  </div>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Completa nuestro formulario detallado para solicitudes específicas de desarrollo
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" style={{ color: '#348FBE' }} />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Lunes - Viernes:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Zona horaria:</span>
                  <span className="font-medium">CST (México)</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Respuesta email:</span>
                  <span>24 horas</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Preguntas Frecuentes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "¿Cuál es el tiempo promedio de respuesta?",
                a: "Respondemos emails en menos de 24 horas y llamadas telefónicas de inmediato en horario laboral."
              },
              {
                q: "¿Trabajan con empresas internacionales?",
                a: "Sí, trabajamos con startups y SMEs de todo el mundo, especialmente en América Latina y Estados Unidos."
              },
              {
                q: "¿Ofrecen servicios de desarrollo de software?",
                a: "Sí, a través de nuestro socio BrainTask ofrecemos desarrollo de software, chatbots y soluciones de IA."
              },
              {
                q: "¿Cómo funciona el proceso de reclutamiento?",
                a: "Primero entendemos tus necesidades, luego buscamos candidatos, realizamos entrevistas preliminares y presentamos los mejores perfiles."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 text-blue-600">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
