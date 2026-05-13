import Link from 'next/link';

export default function Home() {
  return (
    <div className="page-shell">
      <section className="page-card home-card">
        <h1 className="page-title">Bienvenue sur TaskFlow</h1>
        <p className="page-subtitle">Gestion de projets collaboratifs.</p>
        <Link href="/login" className="button">
          Se connecter
        </Link>
      </section>
    </div>
  );
}
