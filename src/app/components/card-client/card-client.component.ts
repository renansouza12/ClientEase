import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-client',
  imports: [CommonModule],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.scss'
})
export class CardClientComponent {
  @Input() name!:string;
  @Input() plan!:string;
  @Input() startDate!:Date;
  @Input() endDate!:Date;
  
  showOptions:boolean = false;


   protected option():void{
    this.showOptions = !this.showOptions;
  }
}
