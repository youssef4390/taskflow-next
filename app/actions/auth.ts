'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AUTH_COOKIE = 'taskflow_user';

export async function login(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const user = await prisma.user.findUnique({
    where: { email },
  });

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

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user ? { id: user.id, email: user.email, name: user.name } : null;
}
