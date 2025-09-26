import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, map } from 'rxjs';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  Timestamp,
  getDocs,
  writeBatch
} from '@angular/fire/firestore';
import { AuthService } from '../authentication/auth.service';
import { Snippet } from '../../models/snippet.interface';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  snippets$: Observable<Snippet[]> = this.authService.user$.pipe(
    switchMap(user => {
      if (!user) return [];
      
      const snippetsRef = collection(this.firestore, `users/${user.uid}/snippets`);
      const snippetsQuery = query(snippetsRef, orderBy('order', 'asc'));
      
      return collectionData(snippetsQuery, { idField: 'id' }).pipe(
        map((snippets: any[]) => 
          snippets.map(snippet => ({
            ...snippet,
            createdAt: snippet.createdAt?.toDate() || new Date(),
            updatedAt: snippet.updatedAt?.toDate() || new Date()
          }))
        )
      );
    })
  );

  async addSnippet(): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to add snippets');
    }

    const currentSnippets = await this.getSnippetsOnce();
    const maxOrder = currentSnippets.length > 0 
      ? Math.max(...currentSnippets.map(s => s.order || 0))
      : -1;

    const snippetsRef = collection(this.firestore, `users/${user.uid}/snippets`);
    
    const snippetData = {
      title: '',
      text: '',
      order: maxOrder + 1,
      isExpanded: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await addDoc(snippetsRef, snippetData);
  }

  async updateSnippet(snippet: Snippet): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user || !snippet.id) {
      throw new Error('User must be logged in and snippet must have an ID');
    }

    const snippetRef = doc(this.firestore, `users/${user.uid}/snippets/${snippet.id}`);
    
    const snippetData = {
      title: snippet.title,
      text: snippet.text,
      isExpanded: snippet.isExpanded,
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(snippetRef, snippetData);
  }

  async deleteSnippet(): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to delete snippets');
    }

    const currentSnippets = await this.getSnippetsOnce();
    if (currentSnippets.length === 0) return;

    const sortedSnippets = currentSnippets.sort((a, b) => (b.order || 0) - (a.order || 0));
    const lastSnippet = sortedSnippets[0];

    if (lastSnippet.id) {
      const snippetRef = doc(this.firestore, `users/${user.uid}/snippets/${lastSnippet.id}`);
      await deleteDoc(snippetRef);
    }
  }

  async updateSnippetsOrder(snippets: Snippet[]): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to update order');
    }

    const batch = writeBatch(this.firestore);
    
    snippets.forEach((snippet, index) => {
      if (snippet.id) {
        const snippetRef = doc(this.firestore, `users/${user.uid}/snippets/${snippet.id}`);
        batch.update(snippetRef, { order: index });
      }
    });

    await batch.commit();
  }

  private async getSnippetsOnce(): Promise<Snippet[]> {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    const snippetsRef = collection(this.firestore, `users/${user.uid}/snippets`);
    const snapshot = await getDocs(snippetsRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()['createdAt']?.toDate() || new Date(),
      updatedAt: doc.data()['updatedAt']?.toDate() || new Date()
    })) as Snippet[];
  }
}
