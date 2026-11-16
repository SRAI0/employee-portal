import {
Component,
OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card';

import { EmployeeService } from '../../services/employee';
import { LeaveService } from '../../services/leave';

@Component({
  selector:'app-admin-dashboard',
  standalone:true,
  imports:[
    CommonModule,
    Navbar,
    DashboardCardComponent
  ],
  templateUrl:'./admin-dashboard.html'
})
export class AdminDashboard implements OnInit {

  totalEmployees=0;
  activeEmployees=0;
  pendingLeaves=0;
  approvedLeaves=0;
  rejectedLeaves=0;

  constructor(
    private employeeService:EmployeeService,
    private leaveService:LeaveService
  ){}

  ngOnInit(){

    this.totalEmployees =
    this.employeeService.getEmployees().length;

    this.activeEmployees =
    this.employeeService
    .getEmployees()
    .filter(x=>x.status==='Active')
    .length;

    this.pendingLeaves =
    this.leaveService
    .getLeaves()
    .filter(x=>x.status==='Pending')
    .length;

    this.approvedLeaves =
    this.leaveService
    .getLeaves()
    .filter(x=>x.status==='Approved')
    .length;

    this.rejectedLeaves =
    this.leaveService
    .getLeaves()
    .filter(x=>x.status==='Rejected')
    .length;

  }
}