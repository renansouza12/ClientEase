import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../models/client.interface';

@Component({
  selector: 'app-card-client',
  imports: [CommonModule],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.scss'
})
export class CardClientComponent {
  @Input() name!: string;
  @Input() plan!: string;
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() client!: Client;

  showOptions: boolean = false;


  @Output() viewClientData: EventEmitter<Client> = new EventEmitter<Client>();
  @Output() deleteClient: EventEmitter<Client> = new EventEmitter<Client>();

  protected option(): void {
    this.showOptions = !this.showOptions;
  }

  protected view(): void {
    this.showOptions = false;

    this.viewClientData.emit(this.client);
  }

  protected delete():void{
    this.deleteClient.emit(this.client);
  }

}
