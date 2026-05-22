import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();

  return projects.map((project) => ({ id: String(project.id) }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="page-shell">
      <section className="page-card project-card">
        <h1 className="page-title">
          <span className="project-dot" style={{ display: 'inline-block', background: project.color }} />
          {project.name}
        </h1>
        <p className="project-meta">Cree le : {project.createdAt.toLocaleDateString('fr-FR')}</p>
        <div>
          <Link href="/dashboard" className="button button-secondary">
            Retour au Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
