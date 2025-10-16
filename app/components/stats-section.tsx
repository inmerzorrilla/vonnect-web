
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AnimatedCounter } from './animated-counter'
import { useLanguage } from '@/hooks/use-language'
import { Users, Briefcase, Building, Clock } from 'lucide-react'

export function StatsSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const stats = [
    {
      icon: Users,
      number: 2500,
      suffix: '+',
      label: t('activeCandidates'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Briefcase,
      number: 850,
      suffix: '+',
      label: t('successfulPlacements'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Building,
      number: 200,
      suffix: '+',
      label: t('partnerCompanies'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      number: 14,
      suffix: '',
      label: t('avgTimeToHire') + ' ' + t('days'),
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t('statsTitle')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4 mx-auto w-16 h-16">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon className={`w-8 h-8 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <AnimatedCounter 
                    end={stat.number}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
