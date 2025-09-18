import { inject, Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, User ,onAuthStateChanged} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../users/user.service';
import { BehaviorSubject, map, shareReplay, take ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    private auth = inject(Auth);
    private firestore = inject(Firestore);
    private userService = inject(UserService);

    user$: Observable<User | null> = authState(this.auth);

    private loadingSubject = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();

    username$ = this.user$.pipe(
        map(user => user?.displayName ?? user?.email ?? '')
    );

    
    constructor(){
        this.user$.pipe(take(1)).subscribe(() => this.loadingSubject.next(false));
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
}
