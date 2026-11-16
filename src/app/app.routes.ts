import { Routes } from '@angular/router';

// import { LoginComponent }
//   from './pages/login/login';

// import { AdminDashboard }
//   from './pages/admin-dashboard/admin-dashboard';

// import { EmployeeDashboard }
//   from './pages/employee-dashboard/employee-dashboard';

import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
// import { EmployeeForm } from './pages/employee-form/employee-form';
// import { EmployeeList } from './pages/employee-list/employee-list';
// import { LeaveList } from './pages/leave-list/leave-list';
// import { LeaveForm } from './pages/leave-form/leave-form';
// import { EmployeeProfile } from './pages/employee-profile/employee-profile';

export class LoginComponent {}
export class AdminDashboard {}
export class EmployeeDashboard {}
export class EmployeeList {}
export class EmployeeForm {}
export class LeaveList {}
export class LeaveForm {}
export class EmployeeProfile {}

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'Admin' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin-dashboard/admin-dashboard')
            .then(m => m.AdminDashboard)
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./pages/employee-list/employee-list')
            .then(m => m.EmployeeList)
      },
      {
        path: 'employees/add',
        loadComponent: () =>
          import('./pages/employee-form/employee-form')
            .then(m => m.EmployeeForm)
      },
      {
        path: 'employees/edit/:id',
        loadComponent: () =>
          import('./pages/employee-form/employee-form')
            .then(m => m.EmployeeForm)
      },
      {
        path: 'leaves',
        loadComponent: () =>
          import('./pages/leave-list/leave-list')
            .then(m => m.LeaveList)
      }
    ]
  },

  {
    path: 'employee',
    canActivate: [authGuard, roleGuard],
    data: { role: 'Employee' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/employee-dashboard/employee-dashboard')
            .then(m => m.EmployeeDashboard)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/employee-profile/employee-profile')
            .then(m => m.EmployeeProfile)
      },
      {
        path: 'leaves',
        loadComponent: () =>
          import('./pages/leave-list/leave-list')
            .then(m => m.LeaveList)
      },
      {
        path: 'leaves/apply',
        loadComponent: () =>
          import('./pages/leave-form/leave-form')
            .then(m => m.LeaveForm)
      }
    ]
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];