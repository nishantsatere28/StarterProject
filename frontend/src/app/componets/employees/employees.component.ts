import { Component, OnInit } from '@angular/core';
import { getEmployeesService } from '../../services/GetEmployeesService';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrentPageSignalService } from '../../ngrxSignal/currentPageSignal';
import { Router } from '@angular/router';
import { employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { EmployeeDataSignalService } from '../../ngrxSignal/employeeDataSignal';
import { BehaviorSubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { HighlightText } from '../../directives/HighlightText';
import { CurrencyPipe } from '@angular/common';
import { AgePipe } from '../../custompipes/AgePipe';

@Component({
  selector: 'app-employees',
  imports: [CommonModule,MatIconModule,HighlightText,AgePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  providers: [CurrencyPipe]
})
export class EmployeesComponent implements OnInit {
  employees: employee[] = [];
  filteredEmployees: employee[] = [];
  errorMessage: string = '';
  searchQuery = new BehaviorSubject<string>('');

  constructor(private getAllEmpService: getEmployeesService,
    private currentPageSignalService: CurrentPageSignalService,
    private router: Router,
    private employeeDataSignalService: EmployeeDataSignalService,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.currentPageSignalService.setCurrentPage('employees');
    this.searchQuery.subscribe((query) => {
      this.filteredEmployees = this.filterEmployees(query);
      this.setErrorMessage(this.filteredEmployees.length);
    });

    if (this.employeeDataSignalService.employeeData().length > 0) {
      this.employees = this.employeeDataSignalService.employeeData();
      this.filteredEmployees = [...this.employees];
      console.log("saved data");
      this.setErrorMessage(this.filteredEmployees.length);
    } else {
      this.getAllEmpService.getEmployees().subscribe({
        next: (response) => {
          this.employeeDataSignalService.setEmployeeData(response.data);
          this.employees = response.data;
          this.filteredEmployees = [...this.employees];
          console.log(this.employeeDataSignalService.employeeData());
          this.setErrorMessage(this.filteredEmployees.length);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          if (!this.errorMessage) {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      });
    }
  }


  filterEmployees(query: string): employee[] {
    if (!query) {
      return this.employees;
    }
    return this.employees.filter((employee) => {
      return employee.employee_name.toLowerCase().includes(query.toLowerCase());
    });
  }

  onSearchChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filter Value:', filterValue);
    this.searchQuery.next(filterValue);
  }

  onButtonClick(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  setErrorMessage(sizeofArray: number): void {
    if (sizeofArray === 0) {
      this.errorMessage = 'No employees found';
    } else {
      this.errorMessage = '';
    }
  }

  formatSalary(salary: number | undefined): string {
    return this.currencyPipe.transform(salary, 'USD', 'symbol', '1.0-2') || '';
  }
}
