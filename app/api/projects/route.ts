import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const { name, color } = await request.json();
  const projectName = String(name || '').trim();
  const projectColor = String(color || '#3498db');

  if (!projectName) {
    return NextResponse.json({ error: 'Le nom du projet est obligatoire' }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: { name: projectName, color: projectColor },
  });

  return NextResponse.json(project, { status: 201 });
}
