import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../app/services/authentication/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    private auth = inject(AuthService);

    protected name!:string;
    protected email!:string;
    protected password!:string;
    protected confirmPassword!:string;
    protected erroMessage!:string;
    protected successMessage!:string;

    protected register(){
        this.erroMessage = "";
        this.successMessage = "";


        if(this.password !== this.confirmPassword){
            this.erroMessage = "Passwords do not match";
            return;
        }


        this.auth.register(this.email,this.password)
        .then(() => {
            return this.auth.updateUsername(this.name);
        })
        .then(() => {
            this.successMessage = "Account created successfuly! You can now log in";
            this.name = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
        })
        .catch((err:any) => this.handleError(err));
        
    }


    private handleError(err:any){
        switch(err.code){
            case "auth/invalid-email":
                this.erroMessage =  "Invalid email format";
            break;
            case "auth/email-already-in-use":
                this.erroMessage = "Email already in use";
            break;
            case  "auth/weak-password":
                this.erroMessage = "Password should be at least 6 characters";
            break;
            default:
                this.erroMessage = "Something went wrong";
        }
    }

 
