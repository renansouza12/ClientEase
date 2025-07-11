import { Component } from '@angular/core';
import { CardClientComponent } from '../card-client/card-client.component';
import {CdkDrag,CdkDragDrop,CdkDropList,moveItemInArray} from '@angular/cdk/drag-drop';
import { Client } from '../../models/client.interface';


@Component({
  selector: 'app-cards',
  imports: [CardClientComponent,CdkDrag,CdkDropList],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  
  clients:Client[]=[
    { 
      name:"Alice",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-07-05"),
      endDate:new Date("2025-08-05")
    },
    {
      name:"Bob",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-07-10"),
      endDate:new Date("2025-08-10")
    },
    {
      name:"Charlie",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-07-15"),
      endDate:new Date("2025-08-15")
    },
    {
      name:"David",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-07-20"),
      endDate:new Date("2025-08-20")
    },
    {
      name:"Eve",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-07-25"),
      endDate:new Date("2025-08-25")
    },
    {
      name:"Frank",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-07-30"),
      endDate:new Date("2025-08-30")
    },
    {
      name:"Grace",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-08-05"),
      endDate:new Date("2025-09-05")
    },
    {
      name:"Heidi",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-08-10"),
      endDate:new Date("2025-09-10")
    },
    {
      name:"Ivan",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-08-15"),
      endDate:new Date("2025-09-15")
    },
    {
      name:"Judy",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-08-20"),
      endDate:new Date("2025-09-20")
    }
  ];

   drop(event: CdkDragDrop<Client[]>) {
    moveItemInArray(this.clients, event.previousIndex, event.currentIndex);
  }

  handleViewClientData(client: Client): void {
    console.log("Client data viewed:", client);
    // Here you can handle the client data, e.g., navigate to a detail page or open a modal
  }

}
