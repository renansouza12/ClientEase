import { inject, Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../users/user.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

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
    
    constructor(){
        
        this.user$.subscribe((user) => {
            if (this.loadingSubject.value) {
                this.loadingSubject.next(false);
            }
        });
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
    
    logout(){
        return signOut(this.auth);
    }
}
