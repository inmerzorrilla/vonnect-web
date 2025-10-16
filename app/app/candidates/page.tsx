
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/hooks/use-language'
import { 
  User, 
  Briefcase, 
  Globe, 
  TrendingUp,
  Search,
  Plus,
  X,
  Upload,
  FileText,
  Zap,
  Target
} from 'lucide-react'
import { techSkills } from '@/lib/types'

export default function CandidatesPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [skillSearch, setSkillSearch] = useState('')
  const [languageSearch, setLanguageSearch] = useState('')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    specialization: '',
    yearsExperience: 0,
    openToRemote: true,
    currentStatus: '',
    expectedSalary: 0,
    currency: 'USD',
    bio: ''
  })

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
      setSkillSearch('')
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill))
  }

  const addLanguage = (language: string) => {
    if (language && !selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language])
      setLanguageSearch('')
    }
  }

  const removeLanguage = (language: string) => {
    setSelectedLanguages(selectedLanguages.filter(l => l !== language))
  }

  const filteredSkills = techSkills.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
    !selectedSkills.includes(skill)
  ).slice(0, 10)

  const commonLanguages = ['English', 'Spanish', 'Portuguese', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Russian']
  const filteredLanguages = commonLanguages.filter(lang =>
    lang.toLowerCase().includes(languageSearch.toLowerCase()) &&
    !selectedLanguages.includes(lang)
  ).slice(0, 10)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          skills: selectedSkills,
          languages: selectedLanguages
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Profile Created!',
          description: 'Welcome to our talent network. We\'ll notify you about matching opportunities.',
        })
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          city: '',
          linkedinUrl: '',
          githubUrl: '',
          portfolioUrl: '',
          specialization: '',
          yearsExperience: 0,
          openToRemote: true,
          currentStatus: '',
          expectedSalary: 0,
          currency: 'USD',
          bio: ''
        })
        setSelectedSkills([])
        setSelectedLanguages([])
      } else {
        throw new Error(data.message || 'Failed to create profile')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create profile. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: Briefcase,
      title: language === 'es' ? 'Oportunidades exclusivas' : 'Exclusive Opportunities',
      description: language === 'es' ? 'Accede a empleos de las mejores empresas tecnológicas, nunca antes publicados.' : 'Access to jobs from top tech companies, never before published.'
    },
    {
      icon: TrendingUp,
      title: language === 'es' ? 'Crecimiento profesional' : 'Career Growth',
      description: language === 'es' ? 'Optimización de CV y preparación para entrevistas para impulsar tu carrera.' : 'CV optimization and interview preparation to boost your career.'
    },
    {
      icon: Globe,
      title: language === 'es' ? 'Red global' : 'Global Network',
      description: language === 'es' ? 'Conecta con empresas de todo el mundo y trabaja a distancia.' : 'Connect with companies from around the world and work remotely.'
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Emparejamiento rápido' : 'Fast Matching',
      description: language === 'es' ? 'Encuentra oportunidades relevantes en cuestión de días.' : 'Find relevant opportunities within days.'
    }
  ]

  const specializations = [
    'Full Stack Development',
    'Frontend Development', 
    'Backend Development',
    'Mobile Development',
    'DevOps Engineering',
    'Data Science',
    'Machine Learning Engineering',
    'UI/UX Design',
    'Product Management',
    'Digital Marketing',
    'Business Development',
    'Quality Assurance',
    'Cybersecurity',
    'Cloud Architecture',
    'Data Engineering'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-16 right-1/4 w-32 h-32 rounded-full"
          style={{ backgroundColor: '#348FBE08' }}
          animate={{
            y: [0, -40, 40, 0],
            x: [0, 30, -30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 left-16 w-28 h-28 rounded-full"
          style={{ backgroundColor: '#FFDA6D10' }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: '#5090DE12' }}
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">
                {language === 'es' ? 'Únete a nuestra red de talentos' : 'Join Our Talent Network'}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {language === 'es' 
                ? 'Conecta con las mejores empresas tecnológicas del mundo. Accede a oportunidades exclusivas y acelera tu crecimiento profesional.'
                : 'Connect with the best tech companies in the world. Get access to exclusive opportunities and accelerate your professional growth.'
              }
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {language === 'es' ? 'Crea tu perfil' : 'Create Your Profile'}
                </CardTitle>
                <CardDescription>
                  {language === 'es' 
                    ? 'Únete a miles de profesionales tecnológicos en nuestra exclusiva red de talentos.'
                    : 'Join thousands of tech professionals in our exclusive talent network.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-primary" />
                      Professional Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                        <Input
                          id="linkedinUrl"
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={formData.linkedinUrl}
                          onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <Input
                          id="githubUrl"
                          type="url"
                          placeholder="https://github.com/yourusername"
                          value={formData.githubUrl}
                          onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                        <Input
                          id="portfolioUrl"
                          type="url"
                          placeholder="https://yourportfolio.com"
                          value={formData.portfolioUrl}
                          onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Professional Details
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization *</Label>
                        <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            {specializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="yearsExperience">Years of Experience *</Label>
                        <Input
                          id="yearsExperience"
                          type="number"
                          min="0"
                          max="50"
                          required
                          value={formData.yearsExperience}
                          onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                        />
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <Label>Skills *</Label>
                        <div className="space-y-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              placeholder="Search and add skills..."
                              value={skillSearch}
                              onChange={(e) => setSkillSearch(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          {skillSearch && (
                            <div className="border rounded-md p-2 space-y-1 bg-popover max-h-40 overflow-y-auto">
                              {filteredSkills.map((skill) => (
                                <button
                                  key={skill}
                                  type="button"
                                  onClick={() => addSkill(skill)}
                                  className="w-full text-left px-2 py-1 text-sm hover:bg-accent rounded"
                                >
                                  <Plus className="w-3 h-3 inline mr-2" />
                                  {skill}
                                </button>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {selectedSkills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="pr-1">
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-2">
                        <Label>Languages *</Label>
                        <div className="space-y-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              placeholder="Search and add languages..."
                              value={languageSearch}
                              onChange={(e) => setLanguageSearch(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          {languageSearch && (
                            <div className="border rounded-md p-2 space-y-1 bg-popover">
                              {filteredLanguages.map((language) => (
                                <button
                                  key={language}
                                  type="button"
                                  onClick={() => addLanguage(language)}
                                  className="w-full text-left px-2 py-1 text-sm hover:bg-accent rounded"
                                >
                                  <Plus className="w-3 h-3 inline mr-2" />
                                  {language}
                                </button>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {selectedLanguages.map((language) => (
                              <Badge key={language} variant="secondary" className="pr-1">
                                {language}
                                <button
                                  type="button"
                                  onClick={() => removeLanguage(language)}
                                  className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentStatus">Current Status *</Label>
                          <Select value={formData.currentStatus} onValueChange={(value) => handleInputChange('currentStatus', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACTIVELY_LOOKING">Actively Looking</SelectItem>
                              <SelectItem value="OPEN_TO_OPPORTUNITIES">Open to Opportunities</SelectItem>
                              <SelectItem value="NOT_LOOKING">Not Looking</SelectItem>
                              <SelectItem value="EMPLOYED">Currently Employed</SelectItem>
                              <SelectItem value="FREELANCING">Freelancing</SelectItem>
                              <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-6">
                          <Checkbox
                            id="openToRemote"
                            checked={formData.openToRemote}
                            onCheckedChange={(checked) => handleInputChange('openToRemote', checked)}
                          />
                          <Label htmlFor="openToRemote">Open to remote work</Label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expectedSalary">Expected Salary</Label>
                          <Input
                            id="expectedSalary"
                            type="number"
                            min="0"
                            value={formData.expectedSalary}
                            onChange={(e) => handleInputChange('expectedSalary', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="CAD">CAD</SelectItem>
                              <SelectItem value="MXN">MXN</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          placeholder="Tell us about yourself, your experience, and what you're looking for..."
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full" 
                    disabled={isSubmitting || selectedSkills.length === 0 || selectedLanguages.length === 0}
                  >
                    {isSubmitting ? 'Creating Profile...' : 'Join Talent Network'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
