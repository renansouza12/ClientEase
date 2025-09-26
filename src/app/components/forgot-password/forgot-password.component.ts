import { Component,inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
    private auth = inject(AuthService);
    private router = inject(Router);
    private fb = inject(FormBuilder);
    
    protected forgotPasswordForm!:FormGroup;
    protected errorMessage!:string;
    protected successMessage!:string;

    protected isLoading:boolean = false;
    

    ngOnInit():void{
        this.forgotPasswordForm = this.fb.group({
            email:['',[Validators.required,Validators.email]]
        });
    }


    protected async sendResetEmail(): Promise<void>{
        
        this.errorMessage = '';
        this.successMessage = '';

        if(this.forgotPasswordForm.invalid){
            this.auth.markFormGroupTouched(this.forgotPasswordForm);
            return;
        }

        const {email} = this.forgotPasswordForm.value;
        this.isLoading = true;

        try {
            await this.auth.forgotPassword(email);
            this.successMessage = `Password reset email sent to ${email}. Please check your inbox and spam folder.`
            this.forgotPasswordForm.reset();
        } catch (err: any) {
            this.handleError(err);
        }finally{
            this.isLoading = false;
        }
    }

    private handleError(err: any): void {
        this.errorMessage = this.auth.getErrorMessage(err.code);
    }
    
    protected getFieldError(controlName: string): string | null {
        return this.auth.getFieldError(this.forgotPasswordForm, controlName);
    }
    
    protected goBackToLogin(): void {
        this.router.navigate(['/login']);
    }


}
