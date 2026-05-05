import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { Project } from '@/types/project.types';

export async function getProjects(): Promise<Project[]> {
  try {
    const snapshot = await getDocs(collection(db, 'projects'));
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    return projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}
