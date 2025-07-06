import { Component } from '@angular/core';
import { CardClientComponent } from '../card-client/card-client.component';

  interface Client{
      name:string;
      plan:string;
      startDate:Date;
      endDate:Date
    }

@Component({
  selector: 'app-cards',
  imports: [CardClientComponent],
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
    }
  ];

}
