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


  private clientService = inject(ClientService);

  ngOnInit(): void {
    this.clientService.clients$.subscribe(clients => {
      this.clients = clients;
      this.clientActives = clients.length;
      this.viewedClients = this.viewedClients.filter(vc =>
        clients.some(c => c.name === vc.name)
      );
    })
  }

  protected drop(event: CdkDragDrop<Client[]>) {
    moveItemInArray(this.clients, event.previousIndex, event.currentIndex);
  }

  protected handleViewClientData(client: Client): void {
    if (!this.viewedClients.some(c => c.name === client.name)) {
      this.viewedClients.push(client);
    }
  }

  protected closeClient(index: number): void {
    this.viewedClients.splice(index, 1);
  }

  protected handleDeleteClient(client: Client): void {
    this.clientService.removeClientByName(client.name);
  }

  protected handleEditClient(client:Client):void{
    this.clientService.showForm(client);
  }

  protected addClient(): void {
    this.clientService.showForm();
  }

}
