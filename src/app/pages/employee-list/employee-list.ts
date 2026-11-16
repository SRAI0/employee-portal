import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import { Navbar } from '../../components/navbar/navbar';
import { EmployeeSearchPipe } from '../../pipes/employee-search-pipe';
import { FormsModule } from '@angular/forms';
import { SalaryPipe } from '../../pipes/salary-pipe';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, EmployeeSearchPipe, FormsModule, SalaryPipe, EmployeeDetailsComponent, ConfirmDialogComponent],
  templateUrl: './employee-list.html'
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];
  searchText: string = '';
  selectedEmployee?: Employee;
  showDialog = false;
  employeeToDelete = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.employeeService.initializeEmployees();

    setTimeout(() => {
      this.employees =
        this.employeeService.getEmployees();
    }, 500);

  }

  editEmployee(id: number) {
    this.router.navigate(['/admin/employees/edit', id]);
  }

  deleteEmployee(id: number) {
    this.employeeToDelete = id;
    this.showDialog = true;

  }

  viewEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  closeDetails() {
    this.selectedEmployee = undefined;
  }

  confirmDelete() {
    this.employeeService.deleteEmployee(
      this.employeeToDelete
    );
    this.employees =
      this.employeeService.getEmployees();
    this.showDialog = false;
  }

  cancelDelete() {
    this.showDialog = false;
  }

}