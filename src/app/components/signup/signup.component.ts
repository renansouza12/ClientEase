import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
    selector: 'app-signup',
    imports: [FormsModule, RouterLink, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
    private auth = inject(AuthService);
    private fb = inject(FormBuilder);
    protected signupForm!: FormGroup;
    protected errorMessage!: string;
    protected successMessage!: string;
    
    ngOnInit(): void {
        this.signupForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.required, 
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            ]],
            confirmPassword: ['', [Validators.required]]
        }, { 
            validators: passwordMatchValidator
        });
    }
    
  protected register(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.signupForm.invalid) {
        this.auth.markFormGroupTouched(this.signupForm);
        return;
    }
    
    const { name, email, password } = this.signupForm.value;
    
    this.auth.register(email, password,name)
        
        .then(() => {
            this.successMessage = 'account created successfully! you can now log in';
            this.signupForm.reset();
        })
        .catch(err => this.handleError(err));
  } 

    
    private handleError(err: any): void {
        this.errorMessage = this.auth.getErrorMessage(err.code);
    }
    
    protected getFieldError(controlName: string): string | null {
        return this.auth.getFieldError(this.signupForm, controlName);
    }
    
    protected hasPasswordMismatchError(): boolean {
        return this.auth.getFormError(this.signupForm, 'passwordMismatch', 'confirmPassword');
    }
    
    protected getPasswordMismatchMessage(): string | null {
        return this.hasPasswordMismatchError() ? 
            this.auth.getFormErrorMessage(this.signupForm, 'passwordMismatch') : null;
    }
}
