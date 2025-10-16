
export interface Language {
  code: string
  name: string
  flag: string
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

export interface TalentRequestForm {
  company: string
  email: string
  phone?: string
  jobTitle: string
  jobDescription: string
  seniority: string
  employmentType: string
  workMode: string
  skills: string[]
  languages: string[]
  minExperience: number
  maxExperience?: number
  salaryMin?: number
  salaryMax?: number
  currency: string
  urgency: string
  location?: string
  comments?: string
}

export interface CandidateForm {
  firstName: string
  lastName: string
  email: string
  phone?: string
  country: string
  city?: string
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  specialization: string
  yearsExperience: number
  skills: string[]
  languages: string[]
  openToRemote: boolean
  currentStatus: string
  expectedSalary?: number
  currency: string
  bio?: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  type: string
}

export interface SalaryCalculatorData {
  jobTitle: string
  level: string
  location: string
  skills: string[]
  yearsExperience: number
}

export interface JobFilter {
  search?: string
  location?: string
  workMode?: string
  seniority?: string
  employmentType?: string
  skills?: string[]
  salaryMin?: number
  salaryMax?: number
}

export interface Stats {
  totalJobs: number
  totalCandidates: number
  totalCompanies: number
  placementsThisMonth: number
  avgTimeToHire: number
  successRate: number
}

export const techSkills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Angular',
  'Node.js', 'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot',
  'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Rails', 'Go', 'Rust',
  'Swift', 'Kotlin', 'Flutter', 'React Native', 'iOS', 'Android',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD',
  'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST API', 'Microservices',
  'Machine Learning', 'AI', 'Data Science', 'Data Analysis', 'Business Intelligence',
  'Product Management', 'UI/UX Design', 'Figma', 'Sketch', 'Adobe Creative Suite',
  'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing',
  'Sales', 'Business Development', 'Account Management', 'Customer Success',
  'Project Management', 'Agile', 'Scrum', 'Jira', 'Confluence'
]

export const jobTitles = [
  'Software Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Mobile Developer', 'iOS Developer', 'Android Developer', 'React Developer',
  'Node.js Developer', 'Python Developer', 'Java Developer', 'PHP Developer',
  'DevOps Engineer', 'Cloud Engineer', 'Data Engineer', 'Data Scientist',
  'Data Analyst', 'Machine Learning Engineer', 'AI Engineer', 'QA Engineer',
  'UI/UX Designer', 'Product Designer', 'Graphic Designer', 'Product Manager',
  'Technical Product Manager', 'Project Manager', 'Scrum Master', 'Business Analyst',
  'Digital Marketing Manager', 'SEO Specialist', 'Content Marketing Manager',
  'Sales Manager', 'Business Development Manager', 'Account Manager',
  'Customer Success Manager', 'Technical Lead', 'Engineering Manager',
  'CTO', 'VP Engineering', 'Head of Product', 'Head of Design'
]
