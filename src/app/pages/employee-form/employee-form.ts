import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
FormBuilder,
FormGroup,
Validators,
ReactiveFormsModule
} from '@angular/forms';

import {
ActivatedRoute,
Router
} from '@angular/router';

import { EmployeeService } from '../../services/employee';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector:'app-employee-form',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl:'./employee-form.html'
})
export class EmployeeForm implements OnInit {

  employeeForm!:FormGroup;

  isEdit=false;

  employeeId:number=0;

  constructor(
    private fb:FormBuilder,
    private employeeService:EmployeeService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(){

    this.employeeForm=this.fb.group({

      id:['',Validators.required],
      fullName:['',Validators.required],
      email:['',
      [Validators.required,Validators.email]],
      phone:['',Validators.required],
      gender:['',Validators.required],
      department:['',Validators.required],
      designation:['',Validators.required],
      salary:['',Validators.required],
      joiningDate:['',Validators.required],
      employmentType:['',Validators.required],
      status:['',Validators.required]

    });

    this.employeeId =
    Number(this.route.snapshot.paramMap.get('id'));

    if(this.employeeId){

      this.isEdit=true;

      const employee=
      this.employeeService.getEmployeeById(
        this.employeeId
      );

      if(employee){
        this.employeeForm.patchValue(employee);
      }

    }

  }

  saveEmployee(){

    if(this.employeeForm.invalid)
    return;

    if(this.isEdit){

      this.employeeService.updateEmployee(
        this.employeeForm.value
      );

    }
    else{

      this.employeeService.addEmployee(
        this.employeeForm.value
      );

    }

    this.router.navigate(
      ['/admin/employees']
    );

  }

}