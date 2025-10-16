
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/use-language'
import { ArrowRight, Play, Users, Briefcase, MessageCircle, Zap, Code, Cpu, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { WhatsAppChatWidget } from './whatsapp-chat-widget'

export function HeroSection() {
  const { t } = useLanguage()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openTelegramChat = () => {
    setIsChatOpen(true)
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://assets.entrepreneur.com/content/3x2/2000/20160323132522-workers-tech-modern-busy-design-office-team-working-staff-designers-creative.jpeg"
            alt="Modern tech office with professionals working collaboratively"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">

              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-600 to-yellow-400 bg-clip-text text-transparent">
                  {t('heroTitle').split(' ')[0]} {t('heroTitle').split(' ')[1]}
                </span>
                <br />
                <span className="text-foreground">
                  {t('heroTitle').split(' ').slice(2).join(' ')}
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground max-w-2xl"
              >
                {t('heroSubtitle')}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-muted-foreground max-w-2xl"
              >
                {t('heroDescription')}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="text-lg px-8 shadow-lg text-white hover:opacity-90" style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }} asChild>
                <Link href="/services">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {t('exploreSolutions')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 border-2" style={{ borderColor: '#348FBE', color: '#348FBE' }} asChild>
                <Link href="/candidates">
                  <Users className="w-5 h-5 mr-2" />
                  {t('joinTalentNetwork')}
                </Link>
              </Button>
            </motion.div>


          </motion.div>

          {/* Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Floating Cards - Closer together */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-4 bg-card border border-border rounded-lg p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                  >
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Active Candidates</p>
                    <p className="text-xs text-muted-foreground">Ready to Connect</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-4 bg-card border border-border rounded-lg p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: '#FFDA6D' }}
                  >
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Open Positions</p>
                    <p className="text-xs text-muted-foreground">Available Now</p>
                  </div>
                </div>
              </motion.div>

              {/* Central Element - Simplified */}
              <div className="relative flex items-center justify-center min-h-[200px]">
                {/* Empty space for cleaner design */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </div>
      </motion.div>

      {/* Telegram Chat Widget */}
      {isChatOpen && (
        <WhatsAppChatWidget 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </section>
  )
}
