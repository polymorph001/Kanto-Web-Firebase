import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home.component';
import {AboutComponent} from './components/about.component';
import {EmployeesComponent} from './components/employees.component';
import { CreateLunchComponent } from './components/create-lunch/create-lunch.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'create-lunch', component: CreateLunchComponent },
    { path: 'login', component: LoginComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
