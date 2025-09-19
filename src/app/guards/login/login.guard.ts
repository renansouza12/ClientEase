import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, filter, map, take } from 'rxjs';
import { AuthService } from '../../services/authentication/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return combineLatest([auth.user$, auth.loading$]).pipe(
        filter(([_, loading]) => !loading), // Wait for loading to be false
            take(1),
        map(([user]) => {
            if (user) {
                return router.parseUrl('/overview');
            } else {
                return true;
            }
        })
    );
};;
