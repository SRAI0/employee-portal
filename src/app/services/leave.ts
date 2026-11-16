import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveRequest } from '../models/leave-request';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  leaves: LeaveRequest[] = [];

  constructor(private http: HttpClient) { }

  initializeLeaves() {

    let data =
      localStorage.getItem('leaves');

    if (data) {
      this.leaves = JSON.parse(data);
    }
    else {

      this.http.get<LeaveRequest[]>(
        'assets/data/leaves.json'
      ).subscribe(res => {

        this.leaves = res;

        localStorage.setItem(
          'leaves',
          JSON.stringify(res)
        );

      });

    }
  }

  getLeaves() {
    return this.leaves;
  }

  addLeave(leave: LeaveRequest) {

    this.leaves.push(leave);

    localStorage.setItem(
      'leaves',
      JSON.stringify(this.leaves)
    );

  }

  approveLeave(id: number) {

    let leave = this.leaves.find(
      x => x.requestId === id
    );

    if (leave) {

      leave.status = 'Approved';

      localStorage.setItem(
        'leaves',
        JSON.stringify(this.leaves)
      );

    }
  }

  rejectLeave(id: number) {

    let leave = this.leaves.find(
      x => x.requestId === id
    );

    if (leave) {

      leave.status = 'Rejected';

      localStorage.setItem(
        'leaves',
        JSON.stringify(this.leaves)
      );

    }
  }
  getLeavesByEmployee(employeeId: number) {
    return this.leaves.filter(
      leave => leave.employeeId === employeeId
    );
  }

}