'use client';

import { useFormStatus } from 'react-dom';
import { addProject } from '../actions/projects';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="button">
      {pending ? 'Création...' : '+ Nouveau projet'}
    </button>
  );
}

export default function AddProjectForm() {
  return (
    <form action={addProject} className="add-project-form">
      <input name="name" placeholder="Nom du projet" required />
      <input
        name="color"
        type="color"
        defaultValue="#3498db"
        className="color-input"
        aria-label="Couleur du projet"
      />
      <SubmitButton />
    </form>
  );
}
