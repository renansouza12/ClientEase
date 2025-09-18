import { inject, Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, User ,onAuthStateChanged} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../users/user.service';
import { BehaviorSubject, map, shareReplay, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    private auth = inject(Auth);
    private firestore = inject(Firestore);
    private userService = inject(UserService);

    private userSubject = new BehaviorSubject<User | null | undefined>(null);
    user$ = authState(this.auth);

    private loadingSubject = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();

    username$ = this.user$.pipe(
        map(user => user?.displayName ?? user?.email ?? '')
    );

    
    constructor(){
        authState(this.auth).subscribe(user => this.userSubject.next(user));

        this.user$.subscribe(() => {
            this.loadingSubject.next(false);
        })
    }


    async loginWithGoogle(){
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.auth,provider);
        await this.userService.createUserData(result.user);
        return result;
    }


    async updateUsername(name:string){
        if(!this.auth.currentUser)return;
        
        await updateProfile(this.auth.currentUser,{displayName:name});
    }


    logout(){
        return signOut(this.auth); 
    }


    get currentUser(){
        return this.userSubject.value;
    }

}
