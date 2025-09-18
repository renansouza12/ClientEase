import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { OverviewComponent } from './components/overview/overview.component';
import { loginGuard } from './guards/login/login.guard';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {path:'login', component:SigninComponent, canActivate:[loginGuard]},
    {path:'overview',component:OverviewComponent,canActivate:[authGuard]},
    {path:'**',redirectTo:'login'}

];
