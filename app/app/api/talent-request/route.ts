
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const talentRequestSchema = z.object({
  // Company info
  companyName: z.string().min(2, 'Company name is required'),
  companyEmail: z.string().email('Invalid email address'),
  companyPhone: z.string().optional(),
  companyWebsite: z.string().url().optional().or(z.literal('')),
  companyIndustry: z.string().optional(),
  companySize: z.enum(['STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']).optional(),
  companyLocation: z.string().optional(),
  companyDescription: z.string().optional(),
  
  // Job details
  jobTitle: z.string().min(2, 'Job title is required'),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters'),
  seniority: z.enum(['INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'PRINCIPAL', 'DIRECTOR', 'VP', 'C_LEVEL']),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP', 'TEMPORARY']),
  workMode: z.enum(['REMOTE', 'HYBRID', 'ON_SITE']),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  minExperience: z.number().min(0).max(50),
  maxExperience: z.number().min(0).max(50).optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  currency: z.string().default('USD'),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  location: z.string().optional(),
  comments: z.string().optional()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = talentRequestSchema.parse(body)
    
    // Check if company exists or create new one
    let company = await prisma.company.findFirst({
      where: { email: validatedData.companyEmail }
    })

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: validatedData.companyName,
          email: validatedData.companyEmail,
          phone: validatedData.companyPhone || null,
          website: validatedData.companyWebsite || null,
          industry: validatedData.companyIndustry || null,
          size: validatedData.companySize || null,
          location: validatedData.companyLocation || null,
          description: validatedData.companyDescription || null
        }
      })
    }

    // Create talent request
    const talentRequest = await prisma.talentRequest.create({
      data: {
        companyId: company.id,
        jobTitle: validatedData.jobTitle,
        jobDescription: validatedData.jobDescription,
        seniority: validatedData.seniority,
        employmentType: validatedData.employmentType,
        workMode: validatedData.workMode,
        skills: validatedData.skills,
        languages: validatedData.languages,
        minExperience: validatedData.minExperience,
        maxExperience: validatedData.maxExperience || null,
        salaryMin: validatedData.salaryMin || null,
        salaryMax: validatedData.salaryMax || null,
        currency: validatedData.currency,
        urgency: validatedData.urgency,
        location: validatedData.location || null,
        comments: validatedData.comments || null,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Talent request submitted successfully',
      id: talentRequest.id
    })
  } catch (error) {
    console.error('Talent request submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const requests = await prisma.talentRequest.findMany({
      include: {
        company: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    return NextResponse.json({ 
      success: true,
      requests: requests.map((req: any) => ({
        ...req,
        salaryMin: req.salaryMin ? Number(req.salaryMin) : null,
        salaryMax: req.salaryMax ? Number(req.salaryMax) : null
      }))
    })
  } catch (error) {
    console.error('Error fetching talent requests:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching talent requests'
      },
      { status: 500 }
    )
  }
}
