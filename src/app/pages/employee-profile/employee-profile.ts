import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Navbar }
  from '../../components/navbar/navbar';

import { EmployeeService }
  from '../../services/employee';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar
  ],
  templateUrl: './employee-profile.html'
})
export class EmployeeProfile implements OnInit {

  employee: any = {};

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    const user = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    const employeeId =
      user.employeeId;

    setTimeout(() => {

      const employee =
        this.employeeService.getEmployeeById(
          employeeId
        );

      console.log('Found:', employee);

      if (employee) {
        this.employee = employee;
        this.cdr.detectChanges();
      }

    }, 500);
  }


  saveProfile() {

    this.employeeService.updateEmployee(
      this.employee
    );

    alert(
      'Profile Updated Successfully'
    );

  }

}