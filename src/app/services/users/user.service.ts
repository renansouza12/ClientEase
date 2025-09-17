import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private firestore = inject(Firestore)

    public createUserData(user:User){

        const ref = doc(this.firestore,`users/${user.uid}`);
        return setDoc(ref,{
            uid:user.uid,
            email:user.email,
            displayName:user.displayName ?? '',
            createdAt: new Date(),
        },{merge:true})
    }
}
