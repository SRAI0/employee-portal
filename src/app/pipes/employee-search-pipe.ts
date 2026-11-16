import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeSearch',
  standalone: true
})
export class EmployeeSearchPipe
  implements PipeTransform {

  transform(
    employees: any[],
    search: string
  ): any[] {

    if (!search) {
      return employees;
    }

    search = search.toLowerCase();

    return employees.filter(emp =>

      emp.fullName.toLowerCase()
        .includes(search)

      ||

      emp.email.toLowerCase()
        .includes(search)

      ||

      emp.department.toLowerCase()
        .includes(search)

    );

  }

}