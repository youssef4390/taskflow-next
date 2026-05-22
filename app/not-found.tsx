import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-shell">
      <section className="page-card not-found-card">
        <h1 className="not-found-title">404</h1>
        <div className="not-found-image">
          <Image src="/404.png" alt="Page not found" width={300} height={200} priority />
        </div>
        <p className="page-subtitle">Cette page n'existe pas</p>
        <Link href="/dashboard" className="button button-secondary">
          Retour au Dashboard
        </Link>
      </section>
    </div>
  );
}
