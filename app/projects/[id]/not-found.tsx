import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="page-shell">
      <section className="page-card project-card">
        <h1 className="page-title">Projet introuvable</h1>
        <p className="page-subtitle">Ce projet n'existe pas ou a ete supprime.</p>
        <Link href="/dashboard" className="button button-secondary">
          Retour au Dashboard
        </Link>
      </section>
    </div>
  );
}
