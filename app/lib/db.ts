import fs from 'fs';
import path from 'path';

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Database {
  projects: Project[];
  users: User[];
}

const DB_PATH = path.join(process.cwd(), 'db.json');

export function readDB(): Database {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as Database;
}

export function writeDB(data: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
