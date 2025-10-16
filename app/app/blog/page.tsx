
'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/hooks/use-language'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogPage() {
  const { t, language } = useLanguage()

  const blogPosts = [
    {
      id: 1,
      title: language === 'es' 
        ? 'BrainTask: La Revolución de la Inteligencia Artificial Empresarial'
        : 'BrainTask: The Enterprise AI Revolution',
      excerpt: language === 'es'
        ? 'Descubre cómo BrainTask está transformando las empresas con chatbots inteligentes, automatización avanzada y soluciones de IA que impulsan la productividad al siguiente nivel. La tecnología que tu empresa necesita para dominar el futuro digital.'
        : 'Discover how BrainTask is transforming businesses with intelligent chatbots, advanced automation, and AI solutions that drive productivity to the next level. The technology your company needs to dominate the digital future.',
      author: 'Team BrainTask',
      date: '2025-09-08',
      readTime: '8 min',
      category: language === 'es' ? 'Innovación Tech' : 'Tech Innovation',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      featured: true,
      tags: ['IA', 'Chatbots', 'Automatización', 'Productividad'],
      content: language === 'es' ? 
        'En un mundo donde la velocidad define el éxito, BrainTask emerge como la plataforma definitiva para empresas que buscan trascender los límites tradicionales. Más que herramientas, ofrecemos ecosistemas inteligentes que transforman ideas en realidades digitales.' :
        'In a world where speed defines success, BrainTask emerges as the definitive platform for companies seeking to transcend traditional boundaries. More than tools, we offer intelligent ecosystems that transform ideas into digital realities.'
    },
    {
      id: 2,
      title: language === 'es'
        ? 'Vonnect 2.0: El Futuro del Reclutamiento Tech con Respaldo de Google'
        : 'Vonnect 2.0: The Future of Tech Recruitment Backed by Google',
      excerpt: language === 'es'
        ? 'Una nueva era comienza para Vonnect. Con el respaldo de ex-ingenieros de Google, revolucionamos el reclutamiento tecnológico con IA avanzada, matching predictivo y una red global que conecta el talento más brillante con las oportunidades más disruptivas.'
        : 'A new era begins for Vonnect. Backed by former Google engineers, we revolutionize tech recruitment with advanced AI, predictive matching, and a global network that connects the brightest talent with the most disruptive opportunities.',
      author: 'Vonnect Leadership',
      date: '2025-09-09',
      readTime: '6 min',
      category: language === 'es' ? 'Anuncio Especial' : 'Special Announcement',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
      featured: true,
      tags: ['Google', 'IA', 'Reclutamiento', 'Innovación'],
      content: language === 'es' ?
        'Hoy marca un hito histórico en Vonnect. Nos enorgullece anunciar que ex-ingenieros de Google se unen a nuestra misión de redefinir el reclutamiento tecnológico. Esta alianza estratégica nos posiciona como los pioneros de una nueva generación de soluciones de talento powered by AI.' :
        'Today marks a historic milestone at Vonnect. We proudly announce that former Google engineers are joining our mission to redefine tech recruitment. This strategic alliance positions us as pioneers of a new generation of AI-powered talent solutions.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">
              {language === 'es' ? 'Innovación Digital' : 'Digital Innovation'}
            </span>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            {language === 'es' 
              ? 'Donde el futuro del reclutamiento tech se encuentra con la revolución de la inteligencia artificial'
              : 'Where the future of tech recruitment meets the artificial intelligence revolution'
            }
          </p>
          
          {/* Frases Poderosas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg border"
              style={{ background: 'linear-gradient(to br, #348FBE10, #5090DE10)' }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: '#348FBE' }}>
                {language === 'es' ? '🚀 Innovación Disruptiva' : '🚀 Disruptive Innovation'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'es' 
                  ? 'Transformando el ADN del reclutamiento con tecnología de vanguardia'
                  : 'Transforming recruitment DNA with cutting-edge technology'
                }
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-lg border"
              style={{ background: 'linear-gradient(to br, #FFDA6D10, #F4C43010)' }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: '#FFDA6D' }}>
                {language === 'es' ? '🧠 IA Avanzada' : '🧠 Advanced AI'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'es' 
                  ? 'Algoritmos inteligentes que conectan talento excepcional'
                  : 'Intelligent algorithms connecting exceptional talent'
                }
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-lg border"
              style={{ background: 'linear-gradient(to br, #348FBE10, #FFDA6D10)' }}
            >
              <h3 className="font-bold text-lg mb-2" style={{ color: '#348FBE' }}>
                {language === 'es' ? '⚡ Velocidad Exponencial' : '⚡ Exponential Speed'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'es' 
                  ? 'Matching instantáneo para oportunidades que cambian el mundo'
                  : 'Instant matching for world-changing opportunities'
                }
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge 
                    className="absolute top-4 left-4 text-white"
                    style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                  >
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge 
                      className="absolute top-4 right-4 animate-pulse" 
                      style={{ backgroundColor: '#FFDA6D', color: '#000' }}
                    >
                      ⭐ Destacado
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="group-hover:transition-colors" style={{ color: post.featured ? '#348FBE' : 'inherit' }}>
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  
                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs"
                          style={{ backgroundColor: '#348FBE20', color: '#348FBE' }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {post.content && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground italic">
                        "{post.content}"
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full text-white shadow-lg hover:opacity-90" 
                    style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                    asChild
                  >
                    <Link href={post.id === 1 ? 'https://braintask.net/' : '/about'} className="flex items-center justify-center">
                      {post.id === 1 
                        ? (language === 'es' ? 'Visitar BrainTask' : 'Visit BrainTask')
                        : (language === 'es' ? 'Conoce más de Vonnect' : 'Learn more about Vonnect')
                      }
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sección de Frases Poderosas sobre Innovación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">
                {language === 'es' ? 'El Futuro es Ahora' : 'The Future is Now'}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Redefiniendo los límites de lo posible en el mundo del reclutamiento tecnológico'
                : 'Redefining the limits of what\'s possible in the world of tech recruitment'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🎯',
                title: language === 'es' ? 'Precisión Láser' : 'Laser Precision',
                desc: language === 'es' ? 'Matching perfecto entre talento y oportunidad' : 'Perfect matching between talent and opportunity'
              },
              {
                icon: '🌐',
                title: language === 'es' ? 'Alcance Global' : 'Global Reach',
                desc: language === 'es' ? 'Conectando continentes con un solo clic' : 'Connecting continents with a single click'
              },
              {
                icon: '💡',
                title: language === 'es' ? 'Ideas Brillantes' : 'Brilliant Ideas',
                desc: language === 'es' ? 'Innovación que transforma industrias' : 'Innovation that transforms industries'
              },
              {
                icon: '⚡',
                title: language === 'es' ? 'Velocidad Luz' : 'Light Speed',
                desc: language === 'es' ? 'Resultados instantáneos, impacto duradero' : 'Instant results, lasting impact'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="text-center p-6 rounded-lg border hover:shadow-lg transition-all duration-300"
                style={{ background: 'linear-gradient(to br, #348FBE05, #FFDA6D05)' }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#348FBE' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quote inspiracional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="max-w-4xl mx-auto p-8 rounded-lg" style={{ background: 'linear-gradient(to right, #348FBE10, #FFDA6D10)' }}>
              <blockquote className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#348FBE' }}>
                "{language === 'es' 
                  ? 'En Vonnect, no solo conectamos talentos, creamos el futuro de las empresas tecnológicas más disruptivas del mundo.'
                  : 'At Vonnect, we don\'t just connect talents, we create the future of the world\'s most disruptive tech companies.'
                }"
              </blockquote>
              <cite className="text-lg text-muted-foreground font-medium">
                {language === 'es' ? '— Vonnect Team, Pioneros del Reclutamiento Tech' : '— Vonnect Team, Tech Recruitment Pioneers'}
              </cite>
            </div>
          </motion.div>

          {/* Estadísticas Impactantes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#348FBE' }}>95%</div>
              <div className="text-sm text-muted-foreground">
                {language === 'es' ? 'Precisión en matching' : 'Matching accuracy'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#FFDA6D' }}>72h</div>
              <div className="text-sm text-muted-foreground">
                {language === 'es' ? 'Tiempo promedio de placement' : 'Average placement time'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#348FBE' }}>500+</div>
              <div className="text-sm text-muted-foreground">
                {language === 'es' ? 'Startups conectadas' : 'Connected startups'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#5090DE' }}>∞</div>
              <div className="text-sm text-muted-foreground">
                {language === 'es' ? 'Potencial de crecimiento' : 'Growth potential'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
