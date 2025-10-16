
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { Briefcase, Users, FileText, Calendar, Calculator, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ServicesPage() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Users,
      title: t('remoteHiring'),
      description: t('remoteHiringDesc'),
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Briefcase,
      title: t('projectTalent'),
      description: t('projectTalentDesc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: t('itSoftwareDev'),
      description: t('itSoftwareDevDesc'),
      color: 'from-blue-500 to-blue-600',
      link: 'https://braintask.net/'
    },
    {
      icon: Calculator,
      title: t('strategicConsulting'),
      description: t('strategicConsultingDesc'),
      color: 'from-blue-600 to-blue-800'
    },
    {
      icon: BarChart3,
      title: t('communityEcosystem'),
      description: t('communityEcosystemDesc'),
      color: 'from-blue-500 to-yellow-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20 pt-32 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-1/4 w-36 h-36 rounded-full"
          style={{ backgroundColor: '#348FBE08' }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-28 h-28 rounded-full"
          style={{ backgroundColor: '#FFDA6D12' }}
          animate={{
            rotate: [0, 360],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-32 left-10 w-20 h-20 rounded-full"
          style={{ backgroundColor: '#5090DE15' }}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -20, 20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('servicesTitle')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.2 + index * 0.15, 
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
                rotateY: 8,
                rotateX: 5
              }}
              whileTap={{ scale: 0.97 }}
            >
              {service.link ? (
                <a href={service.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 group cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
                    <CardHeader className="relative">
                      <motion.div 
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 relative overflow-hidden`}
                        whileHover={{ 
                          rotate: [0, -15, 15, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ 
                            x: [-100, 100],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.8
                          }}
                        />
                        <service.icon className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300 font-semibold">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                      <motion.div 
                        className="flex items-center text-sm font-medium"
                        style={{ color: '#FFDA6D' }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        Visit BrainTask →
                      </motion.div>
                    </CardContent>
                  </Card>
                </a>
              ) : (
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
                  <CardHeader className="relative">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 relative overflow-hidden`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ 
                          x: [-100, 100],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.8
                        }}
                      />
                      <service.icon className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300 font-semibold">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="text-white" style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6 text-white/90">
                Let's discuss how we can help you build your dream team or find your perfect role.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white hover:bg-gray-100 font-semibold"
                style={{ color: '#348FBE' }}
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
