import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: id }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;

    const project = await prisma.project.update({
      where: { id: id },
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    
    // Handle Prisma "record not found" error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id: id }
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025' || error.message?.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    console.error('Error deleting project:', error);
    
    // Handle Prisma "record not found" error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
