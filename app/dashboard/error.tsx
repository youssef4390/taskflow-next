'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page-shell">
      <section className="page-card">
        <h2>Une erreur est survenue</h2>
        <p className="error-message">{error.message}</p>
        <button type="button" className="button" onClick={() => reset()}>
          Reessayer
        </button>
      </section>
    </div>
  );
}
