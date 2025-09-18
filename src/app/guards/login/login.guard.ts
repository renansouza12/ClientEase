import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { combineLatest,filter, map, take } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return combineLatest([auth.user$, auth.loading$]).pipe(
        filter(([_, loading]) => !loading),
            take(1),
        map(([user]) => {
            if (user) {
                router.navigate(['/overview']);
                return false;
            } else {
                return true;
            }
        })
    );
}
