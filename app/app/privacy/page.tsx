
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { Shield, Eye, Lock, Users, Database, Globe, Mail, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function PrivacyPolicyPage() {
  const { t, language } = useLanguage()

  const privacyContent = {
    en: {
      title: "Privacy Policy",
      subtitle: "Your privacy is our priority. Learn how we protect and use your data.",
      lastUpdated: "Last updated: September 4, 2025",
      sections: {
        overview: {
          title: "Overview",
          content: "At Vonnect, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and safeguard your data when you use our recruitment platform.",
          icon: Shield
        },
        dataCollection: {
          title: "Information We Collect",
          content: "We collect information you provide directly, usage data from your interactions with our platform, and technical information about your device and browser. This includes contact details, professional information, and platform usage analytics.",
          icon: Database
        },
        dataUse: {
          title: "How We Use Your Data",
          content: "Your information helps us provide personalized recruitment services, improve our platform, communicate with you about opportunities, and ensure platform security. We never sell your personal information to third parties.",
          icon: Eye
        },
        dataSecurity: {
          title: "Data Security",
          content: "We implement industry-standard security measures including encryption, secure servers, regular security audits, and access controls to protect your information from unauthorized access, alteration, or disclosure.",
          icon: Lock
        },
        userRights: {
          title: "Your Rights",
          content: "You have the right to access, update, delete, or export your personal data. You can also object to certain data processing activities or request data portability. Contact us to exercise these rights.",
          icon: Users
        },
        cookies: {
          title: "Cookies & Tracking",
          content: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie preferences through our consent manager or browser settings.",
          icon: Globe
        }
      },
      contact: {
        title: "Contact Us",
        content: "If you have questions about this privacy policy or how we handle your data, please contact us:",
        email: "privacy@vonnect.net",
        phone: "+1 (555) 123-4567"
      }
    },
    es: {
      title: "Política de Privacidad",
      subtitle: "Tu privacidad es nuestra prioridad. Conoce cómo protegemos y usamos tus datos.",
      lastUpdated: "Última actualización: 4 de septiembre, 2025",
      sections: {
        overview: {
          title: "Resumen",
          content: "En Vonnect, estamos comprometidos a proteger tu privacidad y garantizar la seguridad de tu información personal. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tus datos cuando usas nuestra plataforma de reclutamiento.",
          icon: Shield
        },
        dataCollection: {
          title: "Información que Recopilamos",
          content: "Recopilamos información que proporcionas directamente, datos de uso de tus interacciones con nuestra plataforma, e información técnica sobre tu dispositivo y navegador. Esto incluye detalles de contacto, información profesional y análisis de uso de la plataforma.",
          icon: Database
        },
        dataUse: {
          title: "Cómo Usamos tus Datos",
          content: "Tu información nos ayuda a proporcionar servicios de reclutamiento personalizados, mejorar nuestra plataforma, comunicarnos contigo sobre oportunidades y garantizar la seguridad de la plataforma. Nunca vendemos tu información personal a terceros.",
          icon: Eye
        },
        dataSecurity: {
          title: "Seguridad de Datos",
          content: "Implementamos medidas de seguridad estándar de la industria que incluyen encriptación, servidores seguros, auditorías de seguridad regulares y controles de acceso para proteger tu información del acceso no autorizado, alteración o divulgación.",
          icon: Lock
        },
        userRights: {
          title: "Tus Derechos",
          content: "Tienes derecho a acceder, actualizar, eliminar o exportar tus datos personales. También puedes oponerte a ciertas actividades de procesamiento de datos o solicitar la portabilidad de datos. Contáctanos para ejercer estos derechos.",
          icon: Users
        },
        cookies: {
          title: "Cookies y Seguimiento",
          content: "Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar patrones de uso y proporcionar contenido personalizado. Puedes controlar las preferencias de cookies a través de nuestro gestor de consentimiento o la configuración del navegador.",
          icon: Globe
        }
      },
      contact: {
        title: "Contáctanos",
        content: "Si tienes preguntas sobre esta política de privacidad o cómo manejamos tus datos, por favor contáctanos:",
        email: "privacy@vonnect.net",
        phone: "+1 (555) 123-4567"
      }
    }
  }

  const content = privacyContent[language] || privacyContent.en

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-orange-50/50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-orange-950/20 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 mb-6"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{content.title}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            {content.subtitle}
          </p>
          
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
            {content.lastUpdated}
          </Badge>
        </motion.div>

        <div className="space-y-8">
          {Object.entries(content.sections).map(([key, section], index) => {
            const IconComponent = section.icon
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-semibold">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden">
              <CardContent className="p-8 relative">
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-3" />
                    {content.contact.title}
                  </h2>
                  <p className="mb-6 text-emerald-100">
                    {content.contact.content}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.a
                      href={`mailto:${content.contact.email}`}
                      className="flex items-center space-x-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Mail className="w-5 h-5" />
                      <span>{content.contact.email}</span>
                    </motion.a>
                    
                    <motion.a
                      href={`tel:${content.contact.phone}`}
                      className="flex items-center space-x-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Phone className="w-5 h-5" />
                      <span>{content.contact.phone}</span>
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
