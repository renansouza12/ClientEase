import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    protected erroMessage!:string;

    async loginWithGoogle(){
        try {
            const userCredential = await this.auth.loginWithGoogle();

            this.router.navigate(['/overview']);
        } catch (err) {
            this.handleError(err);
        }

    }
    
    private handleError(err:any){

        switch(err.code){
            case 'auth/invalid-email':
                this.erroMessage = 'Invalid email format';
            break;
            case 'auth/missing-email':
                this.erroMessage = 'Missing email';
            break;
            case 'auth/invalid-credential':
                this.erroMessage = 'Invalid Credential';
            break;
            case 'auth/user-not-found':
                this.erroMessage = 'User not found';
            break;
            case 'auth/wrong-password':
                this.erroMessage = 'Password Invalid'
            break;
            default:
                this.erroMessage = 'Something went wrong';
        }

    }


}
