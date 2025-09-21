import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    imports: [FormsModule,RouterLink, ReactiveFormsModule],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit{
    private auth = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);

    protected email!:string;
    protected password!:string;
    protected erroMessage!:string;
    
    protected loginForm!: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email:['',[Validators.required, Validators.email]],
            password:['',[Validators.required,Validators.minLength(6)]],
        });       
    }
    

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
        this.erroMessage = this.auth.getErroMessage(err.code);
    }   


    protected getFieldErro(controlName:string): string | null{
        const control = this.loginForm.get(controlName);
        return this.auth.getFrontendErroMessage(control?.errors);
    }


}
