import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User, sendPasswordResetEmail} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../users/user.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private firestore = inject(Firestore);
    private userService = inject(UserService);
    
    private loadingSubject = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();
    
    user$ = authState(this.auth);
    
    username$ = this.user$.pipe(
        map(user => user?.displayName ?? user?.email ?? '')
    );

    userPhoto$ = this.user$.pipe(
        map(user => {
            if (user?.photoURL) {
                return user.photoURL;
            } else {
                return '/user-profile.jpg';        
            }
        })  
    );

    constructor(){
        this.user$.subscribe((user) => {
            if (this.loadingSubject.value) {
                this.loadingSubject.next(false);
            }
        });
    }

    private getRandomAvatar(seed: string): string {
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    }

    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.auth, provider);
        await this.userService.createUserData(result.user);
        return result;
    }

    async updateUsername(name: string) {
        if (!this.auth.currentUser) return;
        await updateProfile(this.auth.currentUser, {displayName: name});
        await this.auth.currentUser.reload();
    }

    async login(email: string, password: string) {
        try {

            const result = await signInWithEmailAndPassword(this.auth, email, password);
           
            return result;
        } catch (error: any) {

            throw error;
        }
    }
    
    async register(email: string, password: string, displayName?: string) {
        const cred = await createUserWithEmailAndPassword(this.auth, email, password);
        
        await this.userService.createUserData(cred.user);
        
        if (displayName) {
            await updateProfile(cred.user, { displayName });
            await cred.user.reload();
        }
        
        return cred;
    }


    async forgotPassword(email:string):Promise<void>{
        try {
            await sendPasswordResetEmail(this.auth,email);
        } catch (error) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        return signOut(this.auth);
    } 

    getErrorMessage(code: string): string {
        switch(code){
            case 'auth/invalid-credential':
                return 'Invalid email or password';
            case 'auth/user-not-found':
                return 'User not found';
            case 'auth/wrong-password':
                return 'Password is incorrect';
            case 'auth/user-disabled':
                return 'This account has been disabled';
            case 'auth/email-already-in-use':
                return 'Email is already registered';
            case 'auth/weak-password':
                return 'Password is too weak';
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/too-many-requests':
                return 'Too many password reset requests. Please try again later';
            default:
                return 'Something went wrong, please try again';
        }
    }

    getFrontendErrorMessage(errors: any): string | null {
        if (!errors) return null;
        
        if (errors['required']) return 'This field is required';
        if (errors['email']) return 'Invalid email format';
        if (errors['invalidEmail']) return 'Please enter a valid email address';
        if (errors['minlength']) {
            const requiredLength = errors['minlength'].requiredLength;
            if (requiredLength >= 8) {
                return `Password must be at least ${requiredLength} characters long`;
            }
            return `Minimum length is ${requiredLength} characters`;
        }
        if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength} characters`;
        if (errors['pattern']) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        if (errors['passwordMismatch']) return 'Passwords do not match';
        
        return 'Invalid input';    
    }

    getFieldError(form: FormGroup, controlName: string): string | null {
        const control = form.get(controlName);
        
        if (control?.errors && (control.dirty || control.touched)) {
            return this.getFrontendErrorMessage(control.errors);
        }
        
        return null;
    }
    
    getFormError(form: FormGroup, errorKey: string, triggerControlName?: string): boolean {
        const hasError = form.hasError(errorKey);
        
        if (!hasError) return false;
        
        if (triggerControlName) {
            const triggerControl = form.get(triggerControlName);
            return !!(triggerControl?.dirty || triggerControl?.touched);
        }
        
        return Object.keys(form.controls).some(key => {
            const control = form.get(key);
            return control?.dirty || control?.touched;
        });
    }
    
    getFormErrorMessage(form: FormGroup, errorKey: string): string | null {
        if (!form.hasError(errorKey)) return null;
        
        return this.getFrontendErrorMessage({ [errorKey]: true });
    }
    
    isFormReadyForSubmission(form: FormGroup): boolean {
        return form.valid && form.touched;
    }
    
    markFormGroupTouched(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            control?.markAsTouched();
            
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }
}
