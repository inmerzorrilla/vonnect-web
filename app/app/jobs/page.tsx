
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/hooks/use-language'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Code, 
  Server, 
  Smartphone, 
  Brain, 
  Users, 
  TrendingUp,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function JobsPage() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const jobCategories = [
    { id: 'all', name: 'Todos los empleos', icon: Briefcase, count: 25 },
    { id: 'frontend', name: 'Frontend', icon: Code, count: 8 },
    { id: 'backend', name: 'Backend', icon: Server, count: 6 },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, count: 4 },
    { id: 'ai', name: 'IA/ML', icon: Brain, count: 3 },
    { id: 'management', name: 'Management', icon: Users, count: 4 }
  ]

  const featuredJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechStart Inc.',
      location: 'Remoto (México/LATAM)',
      type: 'Tiempo completo',
      salary: '$2,500 - $4,000 USD',
      category: 'frontend',
      tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      description: 'Buscamos un desarrollador React senior para unirse a nuestro equipo de producto. Experiencia en aplicaciones web escalables.',
      posted: '2 días atrás',
      urgent: true
    },
    {
      id: 2,
      title: 'Full Stack Developer (Node.js)',
      company: 'Innovate Solutions',
      location: 'Híbrido - Guadalajara',
      type: 'Tiempo completo',
      salary: '$35,000 - $55,000 MXN',
      category: 'backend',
      tags: ['Node.js', 'MongoDB', 'Express', 'AWS'],
      description: 'Desarrollador full stack con experiencia en backend Node.js y frontend moderno para aplicaciones web.',
      posted: '1 semana atrás',
      urgent: false
    },
    {
      id: 3,
      title: 'React Native Developer',
      company: 'Mobile First Co.',
      location: 'Remoto',
      type: 'Freelance/Proyecto',
      salary: '$2,000 - $3,500 USD',
      category: 'mobile',
      tags: ['React Native', 'iOS', 'Android', 'TypeScript'],
      description: 'Desarrollo de aplicación móvil para startup fintech. Proyecto de 6 meses con posibilidad de extensión.',
      posted: '3 días atrás',
      urgent: true
    },
    {
      id: 4,
      title: 'Machine Learning Engineer',
      company: 'AI Ventures',
      location: 'Remoto (US/LATAM)',
      type: 'Tiempo completo',
      salary: '$4,000 - $7,000 USD',
      category: 'ai',
      tags: ['Python', 'TensorFlow', 'PyTorch', 'AWS'],
      description: 'Ingeniero ML para desarrollar modelos predictivos en sector retail. Experiencia en deep learning requerida.',
      posted: '5 días atrás',
      urgent: false
    },
    {
      id: 5,
      title: 'Tech Lead - Frontend Team',
      company: 'Scale Up Tech',
      location: 'Ciudad de México',
      type: 'Tiempo completo',
      salary: '$60,000 - $80,000 MXN',
      category: 'management',
      tags: ['Leadership', 'React', 'Team Management', 'Architecture'],
      description: 'Líder técnico para equipo de frontend de 5 personas. Responsable de arquitectura y mentoring.',
      posted: '1 día atrás',
      urgent: true
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'CloudFirst Solutions',
      location: 'Remoto',
      type: 'Contrato',
      salary: '$3,000 - $4,500 USD',
      category: 'backend',
      tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      description: 'Especialista DevOps para migración a microservicios y automatización de deploys.',
      posted: '4 días atrás',
      urgent: false
    }
  ]

  const filteredJobs = selectedCategory === 'all' 
    ? featuredJobs 
    : featuredJobs.filter(job => job.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Empleos Disponibles</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Encuentra tu próximo empleo tech con las mejores startups y SMEs de LATAM y Estados Unidos
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#348FBE' }}>25+</div>
              <div className="text-sm text-muted-foreground">Empleos activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#348FBE' }}>12</div>
              <div className="text-sm text-muted-foreground">Empresas aliadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#348FBE' }}>85%</div>
              <div className="text-sm text-muted-foreground">Posiciones remotas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#348FBE' }}>$45K</div>
              <div className="text-sm text-muted-foreground">Salario promedio</div>
            </div>
          </div>
        </motion.div>

        {/* Job Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Categorías</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {jobCategories.map((category, index) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'bg-white dark:bg-gray-800 hover:shadow-md text-muted-foreground hover:text-foreground'
                  }`}
                  style={isActive ? { background: 'linear-gradient(to right, #348FBE, #5090DE)' } : {}}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                  <Badge variant={isActive ? "secondary" : "outline"} className="ml-2">
                    {category.count}
                  </Badge>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group relative">
                {job.urgent && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge 
                      variant="destructive" 
                      className="animate-pulse"
                      style={{ background: '#FFDA6D', color: '#000' }}
                    >
                      URGENTE
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors mb-2">
                        {job.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-medium mb-2">
                        {job.company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center font-semibold text-green-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xs text-muted-foreground">
                      Publicado {job.posted}
                    </span>
                    <Button
                      size="sm"
                      className="text-white shadow-lg hover:opacity-90"
                      style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                      asChild
                    >
                      <Link href="/candidates">
                        Aplicar
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="gradient-text">
                  {language === 'es' 
                    ? '¿No encuentras el empleo perfecto?'
                    : 'Can\'t find the perfect job?'
                  }
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'es' 
                  ? 'Únete a nuestra red de talento y recibe oportunidades personalizadas directamente en tu email'
                  : 'Join our talent network and get personalized opportunities delivered straight to your inbox.'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <Button
                  size="lg"
                  className="text-white shadow-lg hover:opacity-90"
                  style={{ background: 'linear-gradient(to right, #348FBE, #5090DE)' }}
                  asChild
                >
                  <Link href="/candidates">
                    <Users className="w-4 h-4 mr-2" />
                    {language === 'es' ? 'Únete como Candidato' : 'Join as a Candidate'}
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2"
                  style={{ borderColor: '#348FBE', color: '#348FBE' }}
                  asChild
                >
                  <Link href="/contact">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {language === 'es' ? 'Contactar Reclutador' : 'Contact Recruiter'}
                  </Link>
                </Button>
              </div>


            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
