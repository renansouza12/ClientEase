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
import { Client } from '../../models/client.interface';
import { AuthService } from '../../services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  
  private formVisible = new BehaviorSubject<boolean>(false);
  private clientToEdit = new BehaviorSubject<Client | null>(null);
  
  formVisible$ = this.formVisible.asObservable();
  clientToEdit$ = this.clientToEdit.asObservable();
  
  clients$: Observable<Client[]> = this.authService.user$.pipe(
    switchMap(user => {
      if (!user) return [];
      
      const clientsRef = collection(this.firestore, `users/${user.uid}/clients`);
      const clientsQuery = query(clientsRef, orderBy('order', 'asc'));
      
      return collectionData(clientsQuery, { idField: 'id' }).pipe(
        map((clients: any[]) => 
          clients.map(client => ({
            ...client,
            startDate: client.startDate?.toDate() || new Date(),
            endDate: client.endDate?.toDate() || new Date()
          }))
        )
      );
    })
  );

  async addClient(client: Client): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to add clients');
    }

    const currentClients = await this.getClientsOnce();
    const maxOrder = currentClients.length > 0 
      ? Math.max(...currentClients.map(c => c.order || 0))
      : -1;

    const clientsRef = collection(this.firestore, `users/${user.uid}/clients`);
    
    const clientData = {
      ...client,
      order: maxOrder + 1,
      startDate: Timestamp.fromDate(client.startDate),
      endDate: Timestamp.fromDate(client.endDate)
    };
    
    await addDoc(clientsRef, clientData);
  }

  async updateClient(updatedClient: Client, originalName?: string): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user || !updatedClient.id) {
      throw new Error('User must be logged in and client must have an ID');
    }

    const clientRef = doc(this.firestore, `users/${user.uid}/clients/${updatedClient.id}`);
    
    const clientData = {
      name: updatedClient.name,
      plan: updatedClient.plan,
      phoneNumber: updatedClient.phoneNumber,
      startDate: Timestamp.fromDate(updatedClient.startDate),
      endDate: Timestamp.fromDate(updatedClient.endDate)
    };
    
    await updateDoc(clientRef, clientData);
  }

  async removeClient(clientId: string): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to delete clients');
    }

    const clientRef = doc(this.firestore, `users/${user.uid}/clients/${clientId}`);
    await deleteDoc(clientRef);
  }

  // Update clients order after drag and drop
  async updateClientsOrder(clients: Client[]): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to update order');
    }

    const batch = writeBatch(this.firestore);
    
    clients.forEach((client, index) => {
      if (client.id) {
        const clientRef = doc(this.firestore, `users/${user.uid}/clients/${client.id}`);
        batch.update(clientRef, { order: index });
      }
    });

    await batch.commit();
  }

  showForm(client?: Client): void {
    if (client) {
      this.clientToEdit.next(client); 
    } else {
      this.clientToEdit.next(null); 
    }
    this.formVisible.next(true);
  }

  hideForm(): void {
    this.formVisible.next(false);
  }

  private async getClientsOnce(): Promise<Client[]> {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    const clientsRef = collection(this.firestore, `users/${user.uid}/clients`);
    const snapshot = await getDocs(clientsRef);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data()['startDate']?.toDate() || new Date(),
      endDate: doc.data()['endDate']?.toDate() || new Date()
    })) as Client[];
  }
}
