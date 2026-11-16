import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone:true,
  imports:[Navbar, RouterModule],
  templateUrl:'./employee-dashboard.html'
})
export class EmployeeDashboard {
}