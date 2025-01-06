import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SignalService {
  
  jwtTokenSignal = signal<string | null>(localStorage.getItem('accessToken'));
  isLoggedInSignal = signal<boolean>(!!localStorage.getItem('accessToken'));

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
    this.jwtTokenSignal.set(token);
    this.isLoggedInSignal.set(true);
  }

  clearToken(): void {
    localStorage.removeItem('accessToken');
    this.jwtTokenSignal.set(null);
    this.isLoggedInSignal.set(false);
  }
}
