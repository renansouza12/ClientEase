import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { OverviewComponent } from './components/overview/overview.component';
import { loginGuard } from './guards/login/login.guard';
import { authGuard } from './guards/auth/auth.guard';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    {path:'login', component:SigninComponent, canActivate:[loginGuard]},
    {path:'register', component:SignupComponent, canActivate:[loginGuard]},
    {path:'overview',component:OverviewComponent,canActivate:[authGuard]},
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'**',redirectTo:'/login'}

];
