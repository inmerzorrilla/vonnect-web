
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { Users, Target, Award, Globe, Heart, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Heart,
      title: t('humanCentered'),
      description: t('humanCenteredDesc')
    },
    {
      icon: Globe,
      title: t('globalReach'),
      description: t('globalReachDesc')
    },
    {
      icon: Award,
      title: t('qualityFirst'),
      description: t('qualityFirstDesc')
    },
    {
      icon: Lightbulb,
      title: t('innovation'),
      description: t('innovationDesc')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20 pt-32 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full"
          style={{ backgroundColor: '#348FBE10' }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: '#FFDA6D15' }}
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 60, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full"
          style={{ backgroundColor: '#5090DE20' }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('aboutTitle')}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            {t('aboutSubtitle')}
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {t('aboutDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30">
              <CardHeader>
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                      <Target className="w-6 h-6" style={{ color: '#348FBE' }} />
                    </div>
                    <span>{t('tailoredSolutions')}</span>
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t('tailoredSolutionsText')}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-yellow-50/30 dark:from-gray-900 dark:to-yellow-950/30">
              <CardHeader>
                <motion.div
                  whileHover={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/50">
                      <Users className="w-6 h-6" style={{ color: '#FFDA6D' }} />
                    </div>
                    <span>{t('theTeam')}</span>
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{t('theTeamText')}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            <span className="gradient-text">Our Values</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.6 + index * 0.15, 
                    duration: 0.6, 
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="text-center h-full hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 group">
                    <CardContent className="p-6">
                      <motion.div 
                        className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #348FBE, #5090DE, #FFDA6D)' }}
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
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
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        />
                        <IconComponent className="w-7 h-7 text-white relative z-10" />
                      </motion.div>
                      <motion.h3 
                        className="font-semibold mb-3 text-lg group-hover:text-blue-600 transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.15 }}
                      >
                        {value.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.15 }}
                      >
                        {value.description}
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
