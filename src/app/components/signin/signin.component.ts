import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-signin',
    imports: [FormsModule, RouterLink, ReactiveFormsModule,NgOptimizedImage],
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
    private auth = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);

    protected errorMessage!: string; 
    protected loginForm!: FormGroup;

    protected isLoginLoading:boolean = false;
    protected isGoogleLoading:boolean = false; 
    
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });       
    }
    
    protected async login(): Promise<void> {
        this.errorMessage = '';
        
        if (this.loginForm.invalid) {
            this.auth.markFormGroupTouched(this.loginForm);
            return;
        }
        
        this.isLoginLoading = true;
        const { email, password } = this.loginForm.value;
        
        try {
            const userCredential = await this.auth.login(email, password);
            this.errorMessage = "";
            this.router.navigate(['/overview']);
        } catch (err: any) {
            this.handleError(err);
        }finally{
            this.isLoginLoading = false;
        }
    }
    
    async loginWithGoogle(): Promise<void> {
        this.isGoogleLoading = true;
        try {
            const userCredential = await this.auth.loginWithGoogle();
            this.router.navigate(['/overview']);
        } catch (err) {
            this.handleError(err);
        }finally{
            this.isGoogleLoading = false;
        }
    }
    
    private handleError(err: any): void {
        this.errorMessage = this.auth.getErrorMessage(err.code);
    }   
    
    protected getFieldError(controlName: string): string | null {
        return this.auth.getFieldError(this.loginForm, controlName);
    } 
}
