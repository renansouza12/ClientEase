import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardClientComponent } from '../card-client/card-client.component';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Client } from '../../models/client.interface';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-cards',
  imports: [CardClientComponent, CdkDrag, CdkDropList, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  clients: Client[] = [];
  clientActives: number = 0;


  private clientService = inject(ClientService);

  ngOnInit(): void {
    this.clientService.clients$.subscribe(clients => {
      this.clients = clients;
      this.clientActives = clients.length;
    })
  }

  protected drop(event: CdkDragDrop<Client[]>) {
    moveItemInArray(this.clients, event.previousIndex, event.currentIndex);
  }

  protected handleViewClientData(client: Client): void {
    if (!this.clients.some(c => c.name === client.name)) {
      this.clients.push(client);
    }
  }

  protected closeClient(index: number): void {
    this.clients.splice(index, 1);
  }

  protected handleDeleteClient(client: Client): void {
    this.clientService.removeClientByName(client.name);

  }


}
