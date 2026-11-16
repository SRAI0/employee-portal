import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../services/leave';
import { Navbar } from '../../components/navbar/navbar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [
    CommonModule,
    Navbar, ConfirmDialogComponent
  ],
  templateUrl: './leave-list.html'
})
export class LeaveList implements OnInit {

  leaves: any[] = [];
  showDialog = false;
  dialogTitle = '';
  dialogMessage = '';
  selectedLeaveId = 0;
  action = '';

  constructor(
    private leaveService: LeaveService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    const role =
      this.authService.getRole();
    if (role === 'Admin') {
      this.leaves =
        this.leaveService.getLeaves();
    }
    else {
      const currentUser =
        this.authService.getCurrentUser();
      this.leaves =
        this.leaveService.getLeavesByEmployee(
          currentUser.employeeId
        );
    }
  }

  approve(id: number) {
    this.leaveService.approveLeave(id);
  }

  reject(id: number) {
    this.leaveService.rejectLeave(id);
  }

  approveLeaves(id: number) {

    this.selectedLeaveId = id;
    this.action = 'approve';
    this.dialogTitle = 'Approve Leave';
    this.dialogMessage = 'Approve this leave request ?';
    this.showDialog = true;
  }

  rejectLeaves(id: number) {

    this.selectedLeaveId = id;
    this.action = 'reject';
    this.dialogTitle = 'Reject Leave';
    this.dialogMessage = 'Reject this leave request ?';
    this.showDialog = true;

  }

  confirmAction() {
    if (this.action === 'approve') {
      this.leaveService.approveLeave(
        this.selectedLeaveId
      );
    }
    if (this.action === 'reject') {
      this.leaveService.rejectLeave(
        this.selectedLeaveId
      );
    }
    this.showDialog = false;
  }

  cancelAction() {
    this.showDialog = false;
  }

  getTotalDays(fromDate: string, toDate: string): number {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const difference = end.getTime() - start.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
  }


}