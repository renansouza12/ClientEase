import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  setDoc, 
  Timestamp 
} from '@angular/fire/firestore';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  annotation$: Observable<string> = this.authService.user$.pipe(
    switchMap(user => {
      if (!user) return [];
      
      const annotationRef = collection(this.firestore, `users/${user.uid}/annotations`);
      
      return collectionData(annotationRef, { idField: 'id' }).pipe(
        map((annotations: any[]) => {
          return annotations.length > 0 ? annotations[0].content || '' : '';
        })
      );
    })
  );

  async updateAnnotation(content: string): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to save annotations');
    }

    const annotationRef = doc(this.firestore, `users/${user.uid}/annotations/main`);
    
    const annotationData = {
      content: content,
      updatedAt: Timestamp.now()
    };
    
    await setDoc(annotationRef, annotationData);
  }
}
