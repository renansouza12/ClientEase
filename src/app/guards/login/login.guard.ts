import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth,authState } from '@angular/fire/auth';
import { combineLatest,filter, map, take } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);


    return authState(auth).pipe(
        map(user => {
            if(user){
                router.navigate(['/overview']);
                return false;
            }
            return true;
        })
    )
}
