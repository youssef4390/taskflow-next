import { login } from '../actions/auth';

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <div className="page-shell">
      <section className="page-card auth-card">
        <h1 className="page-title">TaskFlow</h1>
        <p className="page-subtitle">Connectez-vous pour continuer.</p>

        {error === 'invalid' && (
          <p className="error-message">Email ou mot de passe incorrect</p>
        )}

        <form action={login} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            defaultValue="admin@taskflow.com"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            defaultValue="password123"
          />
          <button type="submit" className="button">
            Se connecter
          </button>
        </form>
      </section>
    </div>
  );
}
