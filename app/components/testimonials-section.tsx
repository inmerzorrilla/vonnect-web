
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/hooks/use-language'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

export function TestimonialsSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const testimonials = [
    {
      name: 'Marco A. Diaz',
      role: 'FX Artist',
      company: 'Independent',
      content: 'Vonnect helped me refine my profile and connect with amazing communities. The impact on my career has been incredibly positive. Their personalized approach made all the difference.',
      rating: 5,
      avatar: 'https://assets.entrepreneur.com/content/3x2/2000/1720626300-secrets-to-recruiting-success-0724-g1434438070.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Regional Commercial Manager',
      company: 'Alpha & Beta Research',
      content: 'They understood our needs perfectly and provided qualified candidates aligned with our objectives. The recruitment process improvement was remarkable.',
      rating: 5,
      avatar: 'https://assets.entrepreneur.com/content/3x2/2000/1666364667-shutterstock-1678229830.jpg'
    },
    {
      name: 'Carlos Rodriguez',
      role: 'Data Engineer',
      company: 'BeSmartCorp',
      content: 'After months without responses, Vonnect\'s support led to interviews and my new job. Their commitment to candidates is genuine and effective.',
      rating: 5,
      avatar: 'https://media.wired.com/photos/65e87ea2abb22eee5d4ee6ce/16:9/w_2400,h_1350,c_limit/Tech-Freelancers-Are-Having-A-Moment-Business-1447935082.jpg'
    },
    {
      name: 'Lisa Chen',
      role: 'MuleSoft Developer',
      company: 'TechFlow Solutions',
      content: 'The experience was clear, empathetic, and committed. Their genuine follow-up and support throughout the process was exceptional.',
      rating: 5,
      avatar: 'https://assets.entrepreneur.com/content/3x2/2000/20191126135431-office.jpeg'
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t('testimonialsTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="w-8 h-8" />
                </div>
                <CardContent className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-foreground leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-border">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
