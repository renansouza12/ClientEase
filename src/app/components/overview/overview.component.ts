import { Component, inject, OnInit } from '@angular/core';
import { LinksAndSnippetsComponent } from '../links-and-snippets/links-and-snippets.component';
import { FormClientComponent } from '../form-client/form-client.component';
import { CardsComponent } from '../cards/cards.component';
import { AnnotationComponent } from '../annotation/annotation.component';
import { ClientService } from '../../services/clients/client.service';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-overview',
    imports: [AnnotationComponent,CardsComponent,FormClientComponent,LinksAndSnippetsComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit{

    private auth = inject(AuthService);
    private router = inject(Router);

    title = 'clients';

    isFormClicked: boolean = false;

    private clientService = inject(ClientService);

    ngOnInit(): void {
        this.clientService.formVisible$.subscribe(visible =>{
            this.isFormClicked = visible;
        });
    }

    logout():void{
        this.auth.logout().then(() => {this.router.navigate(['/login'])});
    }
}
