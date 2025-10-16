
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create sample companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'TechFlow Solutions',
        email: 'hiring@techflow.com',
        phone: '+1-555-0123',
        website: 'https://techflow.com',
        industry: 'Software Development',
        size: 'MEDIUM',
        location: 'San Francisco, CA',
        description: 'Leading software development company specializing in web and mobile applications.'
      }
    }),
    prisma.company.create({
      data: {
        name: 'DataVision Analytics',
        email: 'talent@datavision.com',
        phone: '+1-555-0456',
        website: 'https://datavision.com',
        industry: 'Data Analytics',
        size: 'SMALL',
        location: 'Austin, TX',
        description: 'Data analytics and machine learning consultancy helping businesses make data-driven decisions.'
      }
    }),
    prisma.company.create({
      data: {
        name: 'CloudScale Systems',
        email: 'recruitment@cloudscale.com',
        phone: '+1-555-0789',
        website: 'https://cloudscale.com',
        industry: 'Cloud Infrastructure',
        size: 'LARGE',
        location: 'Seattle, WA',
        description: 'Cloud infrastructure provider helping enterprises scale their operations.'
      }
    })
  ])

  console.log('Created companies:', companies.length)

  // Create sample candidates
  const candidates = await Promise.all([
    prisma.candidate.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1-555-1001',
        country: 'United States',
        city: 'New York',
        linkedinUrl: 'https://linkedin.com/in/johndoe',
        githubUrl: 'https://github.com/johndoe',
        specialization: 'Full Stack Development',
        yearsExperience: 5,
        skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        languages: ['English', 'Spanish'],
        openToRemote: true,
        currentStatus: 'ACTIVELY_LOOKING',
        expectedSalary: 120000,
        currency: 'USD',
        bio: 'Experienced full stack developer with a passion for building scalable web applications.'
      }
    }),
    prisma.candidate.create({
      data: {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@email.com',
        phone: '+52-555-2001',
        country: 'Mexico',
        city: 'Mexico City',
        linkedinUrl: 'https://linkedin.com/in/mariagarcia',
        specialization: 'Data Science',
        yearsExperience: 3,
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
        languages: ['Spanish', 'English'],
        openToRemote: true,
        currentStatus: 'OPEN_TO_OPPORTUNITIES',
        expectedSalary: 85000,
        currency: 'USD',
        bio: 'Data scientist specializing in machine learning and predictive analytics.'
      }
    }),
    prisma.candidate.create({
      data: {
        firstName: 'Alex',
        lastName: 'Chen',
        email: 'alex.chen@email.com',
        phone: '+1-555-3001',
        country: 'Canada',
        city: 'Toronto',
        linkedinUrl: 'https://linkedin.com/in/alexchen',
        githubUrl: 'https://github.com/alexchen',
        specialization: 'Mobile Development',
        yearsExperience: 4,
        skills: ['React Native', 'iOS', 'Android', 'Swift', 'Kotlin'],
        languages: ['English', 'Chinese'],
        openToRemote: true,
        currentStatus: 'EMPLOYED',
        expectedSalary: 110000,
        currency: 'CAD',
        bio: 'Mobile developer with expertise in cross-platform and native mobile applications.'
      }
    })
  ])

  console.log('Created candidates:', candidates.length)

  // Create sample testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Marco A. Diaz',
        role: 'FX Artist',
        companyName: 'Independent',
        content: 'Vonnect helped me refine my profile and connect with amazing communities. The impact on my career has been incredibly positive.',
        rating: 5,
        isActive: true
      }
    }),
    prisma.testimonial.create({
      data: {
        name: 'Sarah Johnson',
        role: 'Regional Commercial Manager',
        companyId: companies[0].id,
        companyName: 'Alpha & Beta Research',
        content: 'They understood our needs perfectly and provided qualified candidates aligned with our objectives. The recruitment process improvement was remarkable.',
        rating: 5,
        isActive: true
      }
    }),
    prisma.testimonial.create({
      data: {
        name: 'Carlos Rodriguez',
        role: 'Data Engineer',
        companyName: 'BeSmartCorp',
        content: 'After months without responses, Vonnect\'s support led to interviews and my new job. Their commitment to candidates is genuine and effective.',
        rating: 5,
        isActive: true
      }
    })
  ])

  console.log('Created testimonials:', testimonials.length)

  // Create sample job postings
  const jobPostings = await Promise.all([
    prisma.jobPosting.create({
      data: {
        companyId: companies[0].id,
        title: 'Senior Full Stack Developer',
        description: 'We are looking for a Senior Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.',
        requirements: 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience with React, Node.js, and TypeScript. Experience with cloud platforms (AWS/Azure).',
        responsibilities: 'Develop and maintain web applications, collaborate with design and product teams, write clean and maintainable code, participate in code reviews.',
        seniority: 'SENIOR',
        employmentType: 'FULL_TIME',
        workMode: 'REMOTE',
        location: 'Remote',
        salaryMin: 120000,
        salaryMax: 160000,
        currency: 'USD',
        skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        languages: ['English'],
        benefits: ['Health Insurance', 'Remote Work', '401k Matching', 'Learning Budget'],
        isActive: true
      }
    }),
    prisma.jobPosting.create({
      data: {
        companyId: companies[1].id,
        title: 'Data Scientist',
        description: 'Join our data team to help build machine learning models and extract insights from large datasets.',
        requirements: 'Master\'s degree in Data Science, Statistics, or related field. 3+ years of experience with Python, machine learning frameworks, and statistical analysis.',
        responsibilities: 'Develop ML models, analyze large datasets, create data visualizations, collaborate with product teams to implement data-driven solutions.',
        seniority: 'MID',
        employmentType: 'FULL_TIME',
        workMode: 'HYBRID',
        location: 'Austin, TX',
        salaryMin: 90000,
        salaryMax: 130000,
        currency: 'USD',
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau'],
        languages: ['English'],
        benefits: ['Health Insurance', 'Flexible Hours', 'Stock Options', 'Conference Budget'],
        isActive: true
      }
    }),
    prisma.jobPosting.create({
      data: {
        companyId: companies[2].id,
        title: 'DevOps Engineer',
        description: 'Help scale our cloud infrastructure and implement best practices for deployment and monitoring.',
        requirements: 'Bachelor\'s degree in Computer Science or equivalent experience. 4+ years of experience with AWS, Docker, Kubernetes, and CI/CD pipelines.',
        responsibilities: 'Manage cloud infrastructure, implement CI/CD pipelines, monitor system performance, collaborate with development teams.',
        seniority: 'SENIOR',
        employmentType: 'FULL_TIME',
        workMode: 'ON_SITE',
        location: 'Seattle, WA',
        salaryMin: 140000,
        salaryMax: 180000,
        currency: 'USD',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python'],
        languages: ['English'],
        benefits: ['Health Insurance', 'Stock Options', 'Relocation Assistance', 'Learning Budget'],
        isActive: true
      }
    })
  ])

  console.log('Created job postings:', jobPostings.length)

  // Create sample blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: '5 Killer Tips for Your CV in Tech',
        slug: '5-killer-tips-for-your-cv-in-tech',
        excerpt: 'Discover the essential tips to make your tech CV stand out from the crowd and land your dream job.',
        content: '# 5 Killer Tips for Your CV in Tech\n\nYour CV is your first impression with potential employers. Here are 5 essential tips to make it shine:\n\n## 1. Highlight Your Technical Skills\n\nClearly list your programming languages, frameworks, and tools. Use a skills section to make them easy to spot.\n\n## 2. Show Impact with Numbers\n\nInstead of "improved performance," say "improved application performance by 40%".\n\n## 3. Include Personal Projects\n\nShowcase your passion with links to GitHub projects or personal websites.\n\n## 4. Tailor for Each Application\n\nCustomize your CV for each position, highlighting relevant skills and experience.\n\n## 5. Keep It Concise\n\nAim for 1-2 pages maximum. Recruiters spend only seconds scanning each CV.',
        category: 'TIPS',
        tags: ['CV', 'Career', 'Tech Jobs', 'Resume'],
        isPublished: true,
        publishedAt: new Date(),
        readTimeMinutes: 3
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Remote Work Trends in Tech 2024',
        slug: 'remote-work-trends-in-tech-2024',
        excerpt: 'Explore the latest trends in remote work and how they\'re shaping the tech industry.',
        content: '# Remote Work Trends in Tech 2024\n\nThe landscape of remote work continues to evolve. Here are the key trends we\'re seeing:\n\n## Hybrid Models Are Here to Stay\n\nMost companies are adopting flexible hybrid models that combine remote and office work.\n\n## Focus on Results, Not Hours\n\nCompanies are shifting from measuring hours worked to measuring results delivered.\n\n## Global Talent Pool\n\nCompanies are increasingly hiring talent from anywhere in the world.\n\n## Investment in Remote Tools\n\nSignificant investment in collaboration and productivity tools for remote teams.',
        category: 'TECH_TRENDS',
        tags: ['Remote Work', 'Tech Trends', '2024', 'Future of Work'],
        isPublished: true,
        publishedAt: new Date(),
        readTimeMinutes: 5
      }
    })
  ])

  console.log('Created blog posts:', blogPosts.length)

  // Create salary data
  const salaryData = await Promise.all([
    prisma.salaryData.create({
      data: {
        jobTitle: 'Software Developer',
        level: 'JUNIOR',
        location: 'San Francisco',
        country: 'United States',
        minSalary: 80000,
        maxSalary: 120000,
        avgSalary: 100000,
        currency: 'USD',
        skills: ['JavaScript', 'React', 'Node.js']
      }
    }),
    prisma.salaryData.create({
      data: {
        jobTitle: 'Software Developer',
        level: 'SENIOR',
        location: 'San Francisco',
        country: 'United States',
        minSalary: 140000,
        maxSalary: 200000,
        avgSalary: 170000,
        currency: 'USD',
        skills: ['JavaScript', 'React', 'Node.js', 'AWS']
      }
    }),
    prisma.salaryData.create({
      data: {
        jobTitle: 'Data Scientist',
        level: 'MID',
        location: 'New York',
        country: 'United States',
        minSalary: 100000,
        maxSalary: 140000,
        avgSalary: 120000,
        currency: 'USD',
        skills: ['Python', 'Machine Learning', 'SQL']
      }
    })
  ])

  console.log('Created salary data:', salaryData.length)

  console.log('✅ Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
