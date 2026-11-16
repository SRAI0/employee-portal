import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {

    const result = this.authService.login(
      this.email,
      this.password
    );

    if (result) {

      const role = this.authService.getRole();

      if (role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      }
      else {
        this.router.navigate(['/employee/dashboard']);
      }

    } else {

      this.errorMessage =
        'Invalid Email or Password';

    }

  }
  ngOnInit() {

    if (this.authService.isLoggedIn()) {

      const role = this.authService.getRole();

      if (role === '**min') {
        this.router.navigate(['/admin/dashboard']);
      }
      else {
        this.router.navigate(['/employee/dashboard']);
      }

    }

  }

}
