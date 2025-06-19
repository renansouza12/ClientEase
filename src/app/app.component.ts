import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { CardClientComponent } from './components/card-client/card-client.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AnnotationComponent,CardClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clients';
}
