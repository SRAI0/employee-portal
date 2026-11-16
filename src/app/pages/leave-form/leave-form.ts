import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LeaveService } from '../../services/leave';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './leave-form.html'
})
export class LeaveForm implements OnInit {

  leaveForm!: FormGroup;
  dateError = '';


  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router
  ) { }

  ngOnInit() {

    this.leaveForm = this.fb.group({

      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['',
        [
          Validators.required,
          Validators.minLength(5)
        ]]

    });

  }

  submit() {

    const from =
      new Date(
        this.leaveForm.value.fromDate
      );

    const to =
      new Date(
        this.leaveForm.value.toDate
      );

    if (to < from) {
      this.dateError = 'To Date cannot be earlier than From Date';
      return;
    }
    this.dateError = '';
    if (this.leaveForm.invalid) {
      return;
    }
    const leave = {
      requestId: Date.now(),
      employeeId: 101,
      employeeName: 'Employee',
      ...this.leaveForm.value,
      status: 'Pending'
    };
    this.leaveService.addLeave(leave);
    this.router.navigate(
      ['/employee/leaves']
    );

  }

}