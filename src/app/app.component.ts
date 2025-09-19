import { Component , inject} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { filter } from 'rxjs';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet,AsyncPipe,CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    protected auth = inject(AuthService);
    private router = inject(Router);

    constructor() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            console.log('Navigation ended at:', event.url);
        });
    }

}

