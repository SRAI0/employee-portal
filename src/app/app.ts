import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './services/employee';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet],
  templateUrl:'./app.html'
})
export class App implements OnInit{
  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeService.initializeEmployees();
  }
}
