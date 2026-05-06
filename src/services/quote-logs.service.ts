import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function saveQuoteLog(description: string, projectType: string): Promise<void> {
  await addDoc(collection(db, 'quote_logs'), {
    description,
    projectType,
    createdAt: serverTimestamp(),
  });
}
