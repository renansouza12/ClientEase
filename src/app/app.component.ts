import { Component , inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    protected auth = inject(AuthService);

}
  
