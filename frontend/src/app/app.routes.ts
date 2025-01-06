import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SidebarComponent } from './componets/sidebar/sidebar.component';
import { EmployeesComponent } from './componets/employees/employees.component';
import { ErrorcomponetComponent } from './componets/errorcomponet/errorcomponet.component';
import { EmployeeDetailsComponent } from './componets/employee-details/employee-details.component';
import { HomeComponent } from './componets/home/home.component';
import { AuthGuard } from './services/AuthGuard';
import { RedirectToHome } from './services/RedirectToHome';

export const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
        children: [
            {
                path: 'login',
                component:LoginComponent,
                canActivate: [RedirectToHome]
            },
            {
                path: 'employees',
                component:EmployeesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'employees/:id',
                component:EmployeeDetailsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'home',
                component:HomeComponent
            }
            ,
            {
                path: '**',
                component: ErrorcomponetComponent
            }
        
        ]
        
    }
];
