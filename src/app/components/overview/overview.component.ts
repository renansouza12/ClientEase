import { Component, inject, OnInit } from '@angular/core';
import { LinksAndSnippetsComponent } from '../links-and-snippets/links-and-snippets.component';
import { FormClientComponent } from '../form-client/form-client.component';
import { AnnotationComponent } from '../annotation/annotation.component';
import { ClientService } from '../../services/clients/client.service';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CardsComponent } from '../cards/cards.component';

@Component({
    selector: 'app-overview',
    imports: [AnnotationComponent,CardsComponent,FormClientComponent,LinksAndSnippetsComponent,AsyncPipe],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit{

    protected auth = inject(AuthService);
    private router = inject(Router);

    private clientService = inject(ClientService);

    isFormClicked: boolean = false;

    ngOnInit(): void {
        this.clientService.formVisible$.subscribe(visible =>{
            this.isFormClicked = visible;
        });
    }

      async logout(): Promise<void> {
          try {
            await this.auth.logout();
            this.router.navigate(['login']);

          } catch (error) {
              console.error("Logout Failed", error);
          }           
      }
}
