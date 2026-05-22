import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });

  if (!project) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const { name, color } = await request.json();
  const projectName = String(name || '').trim();
  const projectColor = String(color || '#3498db');

  if (!projectName) {
    return NextResponse.json({ error: 'Le nom du projet est obligatoire' }, { status: 400 });
  }

  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: { name: projectName, color: projectColor },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    await prisma.project.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }
}
