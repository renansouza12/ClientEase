import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AnnotationComponent,CardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clients';
}
