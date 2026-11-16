import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  users = [
    {
      id: 1,
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'Admin'
    },
    {
      id: 2,
      email: 'employee@gmail.com',
      password: 'employee123',
      role: 'Employee',
      employeeId: 101
    }
  ];

  login(email: string, password: string) {

    const user = this.users.find(
      x => x.email === email &&
        x.password === password
    );

    if (user) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify(user)
      );
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') != null;
  }

  getCurrentUser() {
    return JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
  }

  getRole(): string {
    return this.getCurrentUser().role;
  }

}

