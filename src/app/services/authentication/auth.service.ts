import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../users/user.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { emit } from 'process';

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

    async loginWithGoogle(){
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.auth, provider);
        await this.userService.createUserData(result.user);
        return result;
    }

    async updateUsername(name: string){
        if (!this.auth.currentUser) return;
        await updateProfile(this.auth.currentUser, {displayName: name});    
    }

    login(email:string, password:string){
        return signInWithEmailAndPassword(this.auth,email,password);
    }
    
    register(email:string, password:string){
        return createUserWithEmailAndPassword(this.auth,email,password)
        .then(cred => {
            return  this.userService.createUserData(cred.user);
        })
    }

    logout(){
        return signOut(this.auth);
    }


    getErroMessage(code:string){
        switch(code){
            case 'auth/invalid-credential':
                return 'Invalid email or password';
            case 'auth/user-not-found':
                return 'User not found';
            case 'auth/wrong-password':
                return 'Password is incorrect';
            case 'auth/user-disabled':
                return 'This account has been disabled';
            default:
                return 'Something went wrong, please try again';
        }
    }

    getFrontendErroMessage(errors:any): string | null{
        if (!errors) return null;

        if (errors['required']) return 'This field is required';
        if (errors['email']) return 'Invalid email format';
        if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
        if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
        if (errors['pattern']) return 'Invalid format';

        return null;
    }
}
