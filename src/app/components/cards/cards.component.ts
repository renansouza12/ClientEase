import { Component } from '@angular/core';
import { CardClientComponent } from '../card-client/card-client.component';

@Component({
  selector: 'app-cards',
  imports: [CardClientComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

}
