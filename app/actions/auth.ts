'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readDB } from '../lib/db';

const AUTH_COOKIE = 'taskflow_user';

export async function login(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const db = readDB();
  const user = db.users.find((item) => item.email.toLowerCase() === email);

  if (!user || user.password !== password) {
    redirect('/login?error=invalid');
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, user.email, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect('/login');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const email = cookieStore.get(AUTH_COOKIE)?.value;

  if (!email) {
    return null;
  }

  const db = readDB();
  const user = db.users.find((item) => item.email === email);

  return user ? { id: user.id, email: user.email } : null;
}
