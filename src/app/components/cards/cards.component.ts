import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardClientComponent } from '../card-client/card-client.component';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Client } from '../../models/client.interface';
import { ClientService } from '../../services/clients/client.service';


@Component({
    selector: 'app-cards',
    imports: [CardClientComponent, CdkDrag, CdkDropList, CommonModule],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

    clients: Client[] = [];
    viewedClients: Client[] = [];
    clientActives: number = 0;
    loading: boolean = false;
    error: string | null = null;


    private clientService = inject(ClientService);

    ngOnInit(): void {
        this.clientService.clients$.subscribe({
            next: (clients) => {
                this.clients = clients;
                this.clientActives = clients.length;
                this.viewedClients = this.viewedClients.filter(vc =>
                                                               clients.some(c => c.id === vc.id)
                                                              );
            },
            error: (error) => {
                console.error('Error loading clients:', error);
                this.error = 'Failed to load clients';
            }
        });
    }
    protected async drop(event: CdkDragDrop<Client[]>): Promise<void> {
        if (event.previousIndex !== event.currentIndex) {
            moveItemInArray(this.clients, event.previousIndex, event.currentIndex);

            try {
                await this.clientService.updateClientsOrder(this.clients);
            } catch (error) {
                console.error('Error updating order:', error);
                moveItemInArray(this.clients, event.currentIndex, event.previousIndex);
            }
        }
    }

    protected handleViewClientData(client: Client): void {
        if (!this.viewedClients.some(c => c.id === client.id)) {
            this.viewedClients.push(client);
        }
    }

    protected closeClient(index: number): void {
        this.viewedClients.splice(index, 1);
    }


    protected async handleDeleteClient(client: Client): Promise<void> {
        if (!client.id) return;

        if (confirm(`Are you sure you want to delete ${client.name}?`)) {
            try {
                this.loading = true;
                await this.clientService.removeClient(client.id);
                this.error = null;
            } catch (error) {
                console.error('Error deleting client:', error);
                this.error = 'Failed to delete client';
            } finally {
                this.loading = false;
            }
        }
    }


    protected handleEditClient(client:Client):void{
        this.clientService.showForm(client);
    }

    protected addClient(): void {
        this.clientService.showForm();
    }

}
