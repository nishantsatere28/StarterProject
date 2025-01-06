import { signal, Injectable } from "@angular/core";
import { employee } from "../models/employee";

@Injectable({
  providedIn: "root"
})

export class EmployeeDataSignalService {
    employeeData = signal<employee[]>([]);
    setEmployeeData(data: employee[]): void {
        this.employeeData.set(data);
    }
}