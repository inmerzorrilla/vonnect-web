
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
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/hooks/use-language'
import { 
  Building, 
  Users, 
  Clock, 
  CheckCircle, 
  Search,
  Plus,
  X
} from 'lucide-react'
import { techSkills } from '@/lib/types'

export default function CompaniesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [skillSearch, setSkillSearch] = useState('')
  const [languageSearch, setLanguageSearch] = useState('')
  
  const [formData, setFormData] = useState({
    // Company info
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyWebsite: '',
    companyIndustry: '',
    companySize: '',
    companyLocation: '',
    companyDescription: '',
    
    // Job details
    jobTitle: '',
    jobDescription: '',
    seniority: '',
    employmentType: '',
    workMode: '',
    minExperience: 0,
    maxExperience: 0,
    salaryMin: 0,
    salaryMax: 0,
    currency: 'USD',
    urgency: '',
    location: '',
    comments: ''
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
      const response = await fetch('/api/talent-request', {
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
          title: t('requestSubmitted'),
          description: t('requestSubmittedDesc'),
        })
        // Reset form
        setFormData({
          companyName: '',
          companyEmail: '',
          companyPhone: '',
          companyWebsite: '',
          companyIndustry: '',
          companySize: '',
          companyLocation: '',
          companyDescription: '',
          jobTitle: '',
          jobDescription: '',
          seniority: '',
          employmentType: '',
          workMode: '',
          minExperience: 0,
          maxExperience: 0,
          salaryMin: 0,
          salaryMax: 0,
          currency: 'USD',
          urgency: '',
          location: '',
          comments: ''
        })
        setSelectedSkills([])
        setSelectedLanguages([])
      } else {
        throw new Error(data.message || 'Failed to submit request')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit request. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: Users,
      title: t('accessTopTalent'),
      description: t('accessTopTalentDesc')
    },
    {
      icon: Clock,
      title: t('fastHiring'),
      description: t('fastHiringDesc')
    },
    {
      icon: CheckCircle,
      title: t('qualityGuaranteed'),
      description: t('qualityGuaranteedDesc')
    },
    {
      icon: Building,
      title: t('flexibleSolutions'),
      description: t('flexibleSolutionsDesc')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-sky-50/50 to-yellow-50/50 dark:from-blue-950/20 dark:via-sky-950/20 dark:to-yellow-950/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-24 left-1/3 w-40 h-40 rounded-full"
          style={{ backgroundColor: '#348FBE06' }}
          animate={{
            y: [0, -50, 50, 0],
            x: [0, 40, -40, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-28 h-28 rounded-full"
          style={{ backgroundColor: '#FFDA6D15' }}
          animate={{
            rotate: [0, -360],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 rounded-full"
          style={{ backgroundColor: '#5090DE08' }}
          animate={{
            x: [0, -60, 60, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
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
              <span className="gradient-text">{t('hireTopTalent')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('buildRemoteTeam')}
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

      {/* Talent Request Form */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('requestTopTalent')}</CardTitle>
                <CardDescription>
                  {t('requestTalentDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-primary" />
                      {t('companyInformation')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">{t('companyName')} *</Label>
                        <Input
                          id="companyName"
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Company Email *</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          required
                          value={formData.companyEmail}
                          onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">Phone</Label>
                        <Input
                          id="companyPhone"
                          type="tel"
                          value={formData.companyPhone}
                          onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyWebsite">Website</Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          value={formData.companyWebsite}
                          onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="STARTUP">Startup (1-10)</SelectItem>
                            <SelectItem value="SMALL">Small (11-50)</SelectItem>
                            <SelectItem value="MEDIUM">Medium (51-200)</SelectItem>
                            <SelectItem value="LARGE">Large (201-1000)</SelectItem>
                            <SelectItem value="ENTERPRISE">Enterprise (1000+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyLocation">Location</Label>
                        <Input
                          id="companyLocation"
                          type="text"
                          value={formData.companyLocation}
                          onChange={(e) => handleInputChange('companyLocation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Job Details
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input
                          id="jobTitle"
                          type="text"
                          required
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobDescription">Job Description *</Label>
                        <Textarea
                          id="jobDescription"
                          required
                          rows={5}
                          placeholder="Describe the role, responsibilities, and requirements..."
                          value={formData.jobDescription}
                          onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="seniority">Seniority Level *</Label>
                          <Select value={formData.seniority} onValueChange={(value) => handleInputChange('seniority', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="INTERN">Intern</SelectItem>
                              <SelectItem value="JUNIOR">Junior</SelectItem>
                              <SelectItem value="MID">Mid-level</SelectItem>
                              <SelectItem value="SENIOR">Senior</SelectItem>
                              <SelectItem value="LEAD">Lead</SelectItem>
                              <SelectItem value="PRINCIPAL">Principal</SelectItem>
                              <SelectItem value="DIRECTOR">Director</SelectItem>
                              <SelectItem value="VP">VP</SelectItem>
                              <SelectItem value="C_LEVEL">C-Level</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="employmentType">Employment Type *</Label>
                          <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FULL_TIME">Full-time</SelectItem>
                              <SelectItem value="PART_TIME">Part-time</SelectItem>
                              <SelectItem value="CONTRACT">Contract</SelectItem>
                              <SelectItem value="FREELANCE">Freelance</SelectItem>
                              <SelectItem value="INTERNSHIP">Internship</SelectItem>
                              <SelectItem value="TEMPORARY">Temporary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="workMode">Work Mode *</Label>
                          <Select value={formData.workMode} onValueChange={(value) => handleInputChange('workMode', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="REMOTE">Remote</SelectItem>
                              <SelectItem value="HYBRID">Hybrid</SelectItem>
                              <SelectItem value="ON_SITE">On-site</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <Label>Required Skills *</Label>
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
                            <div className="border rounded-md p-2 space-y-1 bg-popover">
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
                        <Label>Required Languages *</Label>
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
                          <Label htmlFor="minExperience">Min Experience (years) *</Label>
                          <Input
                            id="minExperience"
                            type="number"
                            min="0"
                            required
                            value={formData.minExperience}
                            onChange={(e) => handleInputChange('minExperience', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxExperience">Max Experience (years)</Label>
                          <Input
                            id="maxExperience"
                            type="number"
                            min="0"
                            value={formData.maxExperience}
                            onChange={(e) => handleInputChange('maxExperience', parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="salaryMin">Min Salary</Label>
                          <Input
                            id="salaryMin"
                            type="number"
                            min="0"
                            value={formData.salaryMin}
                            onChange={(e) => handleInputChange('salaryMin', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salaryMax">Max Salary</Label>
                          <Input
                            id="salaryMax"
                            type="number"
                            min="0"
                            value={formData.salaryMax}
                            onChange={(e) => handleInputChange('salaryMax', parseInt(e.target.value) || 0)}
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
                        <Label htmlFor="urgency">Urgency *</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LOW">Low - 1-2 months</SelectItem>
                            <SelectItem value="MEDIUM">Medium - 2-4 weeks</SelectItem>
                            <SelectItem value="HIGH">High - 1-2 weeks</SelectItem>
                            <SelectItem value="URGENT">Urgent - ASAP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments">Additional Comments</Label>
                        <Textarea
                          id="comments"
                          rows={3}
                          placeholder="Any specific requirements or preferences..."
                          value={formData.comments}
                          onChange={(e) => handleInputChange('comments', e.target.value)}
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
                    {isSubmitting ? 'Submitting...' : 'Submit Talent Request'}
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
