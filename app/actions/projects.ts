'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

async function getApiUrl() {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  return `${protocol}://${host}`;
}

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  const apiUrl = await getApiUrl();

  await fetch(`${apiUrl}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;
  const color = formData.get('color') as string;
  const apiUrl = await getApiUrl();

  await fetch(`${apiUrl}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color }),
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  const apiUrl = await getApiUrl();

  await fetch(`${apiUrl}/api/projects/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
}
