import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnotationComponent } from './components/annotation/annotation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AnnotationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clients';
}
