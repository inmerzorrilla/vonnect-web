
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { 
  Users, 
  Mail, 
  Phone, 
  Linkedin, 
  Facebook
} from 'lucide-react'

export function Footer() {
  const { t, language } = useLanguage()

  const quickLinks = [
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('jobs'), href: '/jobs' },
    { name: t('contact'), href: '/contact' }
  ]

  const services = [
    { name: t('remoteHiring'), href: '/services' },
    { name: t('itSoftwareDev'), href: 'https://braintask.net/' },
    { name: t('strategicConsulting'), href: '/services' }
  ]

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
              >
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                Vonnect
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footerDescription')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@vonnect.net</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+525578910193</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Networks */}
          <div>
            <h3 className="font-semibold mb-4">
              {language === 'es' ? 'Redes Sociales' : 'Social Networks'}
            </h3>
            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a 
                  href="https://www.linkedin.com/company/vonnect/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4 text-white" />
                  </div>
                  <span>LinkedIn</span>
                </a>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a 
                  href="https://www.facebook.com/profile.php?id=61577220763921" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Facebook className="w-4 h-4 text-white" />
                  </div>
                  <span>Facebook</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vonnect. {t('allRightsReserved')}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link 
                href="/privacy" 
                className="hover:text-foreground transition-colors"
              >
                {t('privacyPolicy')}
              </Link>
              <span>•</span>
              <Link 
                href="/admin/telegram-setup" 
                className="hover:text-primary transition-colors opacity-50 hover:opacity-100"
                title="Configuración de Telegram"
              >
                🤖 Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
