
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/use-language'
import { 
  Globe, 
  Code, 
  FileText, 
  Users, 
  Calculator, 
  BarChart3,
  ArrowRight 
} from 'lucide-react'
import Link from 'next/link'

export function ServicesSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const services = [
    {
      icon: Globe,
      title: t('remoteHiring'),
      description: t('remoteHiringDesc'),
      href: '/services',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: t('projectTalent'),
      description: t('projectTalentDesc'),
      href: '/services',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: FileText,
      title: t('itSoftwareDev'),
      description: t('itSoftwareDevDesc'),
      href: 'https://braintask.net/',
      color: 'from-blue-500 to-blue-600',
      external: true
    },
    {
      icon: Calculator,
      title: t('strategicConsulting'),
      description: t('strategicConsultingDesc'),
      href: '/services',
      color: 'from-blue-500 to-blue-800'
    },
    {
      icon: BarChart3,
      title: t('communityEcosystem'),
      description: t('communityEcosystemDesc'),
      href: '/services',
      color: 'from-blue-400 to-yellow-400'
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t('servicesTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group-hover:bg-primary/10"
                      asChild
                    >
                      {service.external ? (
                        <a href={service.href} target="_blank" rel="noopener noreferrer" style={{ color: '#348FBE' }}>
                          Visit BrainTask
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: '#348FBE' }} />
                        </a>
                      ) : (
                        <Link href={service.href}>
                          {t('learnMore')}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button size="lg" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
