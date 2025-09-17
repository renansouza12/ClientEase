import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { OverviewComponent } from './components/overview/overview.component';

export const routes: Routes = [
    {path:'login', component:SigninComponent},
    {path:'overview',component:OverviewComponent},
    {path:'**',redirectTo:'login'}

];
