import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;

    // Validate required fields
    if (!title || !description || !technologies || technologies.length === 0) {
      return NextResponse.json(
        { error: 'Title, description, and technologies are required' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies
      }
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}