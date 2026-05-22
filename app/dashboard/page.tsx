import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="page-shell">
      <section className="page-card">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          {projects.length} projet{projects.length > 1 ? 's' : ''}. Gerez leurs couleurs et leurs noms depuis un seul endroit.
        </p>

        <AddProjectForm />

        {projects.length === 0 ? (
          <p className="empty-state">Aucun projet pour le moment.</p>
        ) : (
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project.id} className="project-row">
                <span className="project-dot" style={{ background: project.color }} />
                <Link href={`/projects/${project.id}`}>{project.name}</Link>

                <form action={renameProject} className="rename-form">
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="color" value={project.color} />
                  <input name="newName" defaultValue={project.name} required />
                  <button type="submit" className="button button-secondary">
                    Renommer
                  </button>
                </form>

                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    aria-label={`Supprimer ${project.name}`}
                    className="button button-danger"
                  >
                    Supprimer
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
