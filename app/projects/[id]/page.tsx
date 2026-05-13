import Link from 'next/link';
import { headers } from 'next/headers';
import type { Project } from '../../lib/db';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

async function getProject(id: string) {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res = await fetch(`${protocol}://${host}/api/projects/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Project;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="page-shell">
        <section className="page-card project-card">Projet non trouvé</section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-card project-card">
        <h1 className="page-title">
          <span className="project-dot" style={{ display: 'inline-block', background: project.color }} />
          {project.name}
        </h1>
        <p className="project-meta">ID : {project.id}</p>
        <div>
          <Link href="/dashboard" className="button button-secondary">
            Retour au Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
