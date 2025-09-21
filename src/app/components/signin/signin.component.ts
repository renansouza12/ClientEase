import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    protected email!:string;
    protected password!:string;
    protected erroMessage!:string;


    protected login(){
       this.auth.login(this.email,this.password)
       .then(userCredential => {
           this.erroMessage = "";
           this.router.navigate(['/overview'])
       })
       .catch(err => this.handleError(err));
    }

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
