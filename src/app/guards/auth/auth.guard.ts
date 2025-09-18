import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { combineLatest,filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const  auth = inject(AuthService);
    const router = inject(Router);

    return combineLatest([auth.user$, auth.loading$]).pipe(
        filter(([_,loading  ]) => !loading),
        take(1),
        map(([user,loading]) =>{
            if(loading){
                return false;
            }
            if(user){
                return true
            }else{
                router.navigate(['/login']);
                return false;
            }
        }),
    );
};
