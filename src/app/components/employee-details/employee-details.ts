import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.html'
})
export class EmployeeDetailsComponent {

  @Input()
  employee!: Employee;

  @Output()
  editEmployee = new EventEmitter<number>();

  @Output()
  deleteEmployee = new EventEmitter<number>();

  @Output()
  closeDetails = new EventEmitter<void>();

}