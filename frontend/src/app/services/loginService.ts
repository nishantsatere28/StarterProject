import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { SignalService } from "../ngrxSignal/auth.store";
import { SidebarService } from "../ngrxSignal/siderbarSignal";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private apiUrl = "http://localhost:3000/login";

  constructor(
    private http: HttpClient,
    private signalService: SignalService,
    private sidebarService: SidebarService,
    private router: Router
  ) {}

  loginDetails(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  loginSuccess(token: string): void {
    this.signalService.jwtTokenSignal.set(token);
    this.signalService.isLoggedInSignal.set(true);
    this.signalService.setToken(token);
  }

  logout(): void {
    this.signalService.jwtTokenSignal.set(null);
    this.signalService.isLoggedInSignal.set(false);
    this.signalService.clearToken();
    this.sidebarService.clearState();
    this.router.navigate(["/login"]);
  }
}
