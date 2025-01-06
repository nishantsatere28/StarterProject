import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CurrentPageSignalService {
  currentPage = signal<string>(localStorage.getItem("currentPage") || "");

  setCurrentPage(page: string): void {   
    this.currentPage.set(page);
    localStorage.setItem("currentPage", page);
  }
}
