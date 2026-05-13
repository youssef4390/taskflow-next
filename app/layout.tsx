import type { Metadata } from 'next';
import Link from 'next/link';
import { getCurrentUser, logout } from './actions/auth';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Gestion de projets collaboratifs',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="fr">
      <body>
        <header className="app-header">
          <Link href="/" className="brand">
            <h2 className="brand-title">TaskFlow</h2>
          </Link>
          <nav className="nav">
            <Link href="/dashboard">Dashboard</Link>
            {user ? (
              <>
                <span className="nav-user">{user.email}</span>
                <form action={logout}>
                  <button type="submit" className="button button-secondary button-header">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
