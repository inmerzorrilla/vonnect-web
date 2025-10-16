
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/use-language'
import { Lightbulb, Target, Cog, Network } from 'lucide-react'
import Link from 'next/link'

export function WhyChooseUsSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const features = [
    {
      icon: Lightbulb,
      title: t('innovativeTalent'),
      description: t('innovativeTalentDesc'),
    },
    {
      icon: Target,
      title: t('customizedApproach'),
      description: t('customizedApproachDesc'),
    },
    {
      icon: Cog,
      title: t('endToEndServices'),
      description: t('endToEndServicesDesc'),
    },
    {
      icon: Network,
      title: t('connectedEcosystem'),
      description: t('connectedEcosystemDesc'),
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">{t('whyChooseTitle')}</h2>
          <h3 className="text-2xl mb-4 gradient-text">{t('whyChooseSubtitle')}</h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
            {t('whyChooseDesc')}
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 shadow-lg text-white hover:opacity-90" 
            style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
            asChild
          >
            <Link href="/contact">
              {t('partnerWithUs')}
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
