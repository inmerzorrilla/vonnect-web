
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const candidateSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  city: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  specialization: z.string().min(2, 'Specialization is required'),
  yearsExperience: z.number().min(0).max(50),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  openToRemote: z.boolean(),
  currentStatus: z.enum(['ACTIVELY_LOOKING', 'OPEN_TO_OPPORTUNITIES', 'NOT_LOOKING', 'EMPLOYED', 'FREELANCING', 'UNEMPLOYED']),
  expectedSalary: z.number().min(0).optional(),
  currency: z.string().default('USD'),
  bio: z.string().optional()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = candidateSchema.parse(body)
    
    // Check if candidate already exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { email: validatedData.email }
    })

    if (existingCandidate) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'A candidate with this email already exists'
        },
        { status: 409 }
      )
    }

    // Create candidate profile
    const candidate = await prisma.candidate.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        country: validatedData.country,
        city: validatedData.city || null,
        linkedinUrl: validatedData.linkedinUrl || null,
        githubUrl: validatedData.githubUrl || null,
        portfolioUrl: validatedData.portfolioUrl || null,
        specialization: validatedData.specialization,
        yearsExperience: validatedData.yearsExperience,
        skills: validatedData.skills,
        languages: validatedData.languages,
        openToRemote: validatedData.openToRemote,
        currentStatus: validatedData.currentStatus,
        expectedSalary: validatedData.expectedSalary || null,
        currency: validatedData.currency,
        bio: validatedData.bio || null
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Candidate profile created successfully',
      id: candidate.id
    })
  } catch (error) {
    console.error('Candidate profile creation error:', error)
    
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
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        country: true,
        specialization: true,
        yearsExperience: true,
        skills: true,
        languages: true,
        openToRemote: true,
        currentStatus: true,
        expectedSalary: true,
        currency: true,
        createdAt: true
      }
    })

    return NextResponse.json({ 
      success: true,
      candidates: candidates.map((candidate: any) => ({
        ...candidate,
        expectedSalary: candidate.expectedSalary ? Number(candidate.expectedSalary) : null
      }))
    })
  } catch (error) {
    console.error('Error fetching candidates:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching candidates'
      },
      { status: 500 }
    )
  }
}
