import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
    selector: 'app-signup',
    imports: [FormsModule,RouterLink, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

    private auth = inject(AuthService);
    private fb = inject(FormBuilder);

    protected signupForm!:FormGroup;
    protected erroMessage!:string;
    protected successMessage!:string;

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }); }



        protected register() {
            this.erroMessage = '';
            this.successMessage = '';

            if (this.signupForm.invalid) {
                this.signupForm.markAllAsTouched(); 
                return;
            }

            const { name, email, password, confirmPassword } = this.signupForm.value;

            if (password !== confirmPassword) {
                this.erroMessage = 'Passwords do not match';
                return;
            }

            this.auth.register(email, password)
            .then(() => this.auth.updateUsername(name))
            .then(() => {
                this.successMessage = 'Account created successfully! You can now log in';
                this.signupForm.reset();
            })
            .catch(err => this.handleError(err));
        }


        private handleError(err:any){
            this.auth.getErroMessage(err.code);
        }
        protected getFieldError(controlName: string): string | null {
            const control = this.signupForm.get(controlName);
            return this.auth.getFrontendErroMessage(control?.errors);
        }

}
