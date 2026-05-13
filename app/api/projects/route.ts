import { NextResponse } from 'next/server';
import { readDB, writeDB } from '../../lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || '').trim();
  const color = String(body.color || '#3498db');

  if (!name) {
    return NextResponse.json({ error: 'Le nom du projet est obligatoire' }, { status: 400 });
  }

  const db = readDB();
  const newProject = {
    id: String(Date.now()),
    name,
    color,
  };

  db.projects.push(newProject);
  writeDB(db);

  return NextResponse.json(newProject, { status: 201 });
}
