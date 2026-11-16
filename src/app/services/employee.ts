import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  initializeEmployees() {

    console.log('initializeEmployees called');
    const empData =
      localStorage.getItem('employees');
    console.log('localStorage employees=', empData);
    
    if (empData && JSON.parse(empData).length > 0) {

      console.log('Loaded from LocalStorage');

      this.employees = JSON.parse(empData);

    } else {

      console.log('Loading from JSON file...');

      this.http.get<Employee[]>(
        'data/employees.json'
      ).subscribe(data => {

        console.log('JSON Loaded:', data);

        this.employees = data;

        localStorage.setItem(
          'employees',
          JSON.stringify(data)
        );

      });

    }
  }

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number) {

    const employeeData =
      localStorage.getItem('employees');

    if (!employeeData) {
      return undefined;
    }

    const employees =
      JSON.parse(employeeData);

    return employees.find(
      (x: any) => x.id === id
    );
  }

  addEmployee(emp: Employee) {

    this.employees.push(emp);

    localStorage.setItem(
      'employees',
      JSON.stringify(this.employees)
    );

  }

  updateEmployee(updatedEmployee: Employee) {

    let index =
      this.employees.findIndex(
        x => x.id === updatedEmployee.id
      );

    this.employees[index] = updatedEmployee;

    localStorage.setItem(
      'employees',
      JSON.stringify(this.employees)
    );

  }

  deleteEmployee(id: number) {

    this.employees =
      this.employees.filter(
        x => x.id !== id
      );

    localStorage.setItem(
      'employees',
      JSON.stringify(this.employees)
    );

  }

}