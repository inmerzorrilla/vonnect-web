
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Users, Target } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export function FindTalentSection() {
  const { t, language } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="gradient-text">{t('findTopTalentTitle')}</span>
            </motion.h2>
            
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('findTopTalentDesc')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 shadow-lg text-white hover:opacity-90" 
                style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                asChild
              >
                <Link href="/about">
                  {t('moreAboutUs')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: Zap, 
                  title: language === 'es' ? 'Búsqueda Rápida' : 'Fast Matching', 
                  desc: language === 'es' ? 'Identificación ágil de talento' : 'Quick talent identification' 
                },
                { 
                  icon: Users, 
                  title: language === 'es' ? 'Red de Expertos' : 'Expert Network', 
                  desc: language === 'es' ? 'Profesionales seleccionados' : 'Curated professionals' 
                },
                { 
                  icon: Target, 
                  title: language === 'es' ? 'Ajuste Perfecto' : 'Perfect Fit', 
                  desc: language === 'es' ? 'Candidatos alineados a tus objetivos' : 'Goal-aligned candidates' 
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div 
                        className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2" style={{ color: '#348FBE' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#FFDA6D' }} />
            <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#348FBE' }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
