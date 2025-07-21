import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../models/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  private clientsSource = new BehaviorSubject<Client[]>([
     { 
      name:"Alice",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-07-05"),
      endDate:new Date("2025-08-05"),
      phoneNumber:"123-456-7890"
    },
    {
      name:"Bob",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-07-10"),
      endDate:new Date("2025-08-10"),
      phoneNumber:"987-654-3210"
    },
    {
      name:"Charlie",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-07-15"),
      endDate:new Date("2025-08-15"),
      phoneNumber:"555-123-4567"
    },
    {
      name:"David",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-07-20"),
      endDate:new Date("2025-08-20"),
      phoneNumber:"555-987-6543"
    },
    {
      name:"Eve",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-07-25"),
      endDate:new Date("2025-08-25"),
      phoneNumber:"555-555-5555"
    },
    {
      name:"Frank",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-07-30"),
      endDate:new Date("2025-08-30"),
      phoneNumber:"555-111-2222"
    },
    {
      name:"Grace",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-08-05"),
      endDate:new Date("2025-09-05"),
      phoneNumber:"555-333-4444"
    },
    {
      name:"Heidi",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-08-10"),
      endDate:new Date("2025-09-10"),
      phoneNumber:"555-777-8888"
    },
    {
      name:"Ivan",
      plan:"Normal Plano 100R$",
      startDate:new Date("2025-08-15"),
      endDate:new Date("2025-09-15"),
      phoneNumber:"555-999-0000"  
    },
    {
      name:"Judy",
      plan:"Family Plano 150R$",
      startDate:new Date("2025-08-20"),
      endDate:new Date("2025-09-20"),
      phoneNumber:"555-222-3333"
    }
  ]);

  clients$ = this.clientsSource.asObservable();

  getClients():Client[]{
    return this.clientsSource.getValue();
  }

  removeClientByName(nameToRemove:string){
    const updated = this.getClients().filter(client => client.name !== nameToRemove);
    this.clientsSource.next(updated);
  }
}
