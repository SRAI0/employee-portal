export interface LeaveRequest {
  requestId: number;
  employeeId: number;
  employeeName: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
}