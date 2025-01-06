import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService';
import { HttpErrorResponse } from '@angular/common/http';
import { SignalService } from '../../ngrxSignal/auth.store';
import { CurrentPageSignalService } from '../../ngrxSignal/currentPageSignal';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // standalone:true
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  jwtToken: string = '';

  constructor(private fb: FormBuilder, 
    private router: Router,
    private loginService:LoginService, 
    private signalservice:SignalService,
    private currentPageSignalService: CurrentPageSignalService
  ) { }

  ngOnInit(): void {
    this.currentPageSignalService.setCurrentPage('login');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // console.log(this.loginForm.value);
      this.loginService.loginDetails({ email, password }).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          alert("Login Successful")
          this.loginService.loginSuccess(response.JwtToken)
          this.router.navigate(['/employees']);
        },
        error: (err: HttpErrorResponse) => {
          console.log("running");
          console.log(err.error.msg)
          this.errorMessage = err.error.msg;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}