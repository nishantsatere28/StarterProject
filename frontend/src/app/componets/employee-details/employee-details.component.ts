import { Component, OnInit } from '@angular/core';
import { getEmployeeDetails } from '../../services/GetEmployeeDetails';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { employee } from '../../models/employee';
import { CurrencyPipe } from '@angular/common';
import { AgePipe } from '../../custompipes/AgePipe';
import { EmployeeDataSignalService } from '../../ngrxSignal/employeeDataSignal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  imports: [AgePipe,CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [CurrencyPipe]
})
export class EmployeeDetailsComponent implements OnInit {
  employee: employee | null = null;
  errorMessage: string = '';

  constructor(private getemployeedetails: getEmployeeDetails,
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private employeeDataSignalService: EmployeeDataSignalService
  ) { }


  ngOnInit(): void {
    const employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(employeeId)
    if (this.employeeDataSignalService.employeeData().length > 0) {
      const employee = this.employeeDataSignalService.employeeData().find((emp) => emp.id === employeeId);
      if (employee) {
        this.employee = employee
        console.log("saved")
      } 
    }else {
      console.log(employeeId)
      this.getemployeedetails.getEmployee(employeeId).subscribe({
        next: (response) => {
          console.log(response.employee)
          this.employee = response.employee;
          this.employeeDataSignalService.setEmployeeData([response.employee]);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          console.log(err.error.message);
        }
      })
    }
  }

  formatSalary(salary: number | undefined): string {
    return this.currencyPipe.transform(salary, 'USD', 'symbol', '1.0-2') || '';
  }
}
