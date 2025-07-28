import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { CardsComponent } from './components/cards/cards.component';
import { FormClientComponent } from './components/form-client/form-client.component';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AnnotationComponent,CardsComponent,FormClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'clients';

  isFormClicked: boolean = false;

  private clientService = inject(ClientService);

    ngOnInit(): void {
      this.clientService.formVisible$.subscribe(visible =>{
        this.isFormClicked = visible;
      });
    }
}
  