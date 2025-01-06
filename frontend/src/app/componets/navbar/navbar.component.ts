import { Component, WritableSignal } from '@angular/core';
import { SidebarService } from '../../ngrxSignal/siderbarSignal';
import { LoginService } from '../../services/loginService';
import { SignalService } from '../../ngrxSignal/auth.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HighlightText } from '../../directives/HighlightText';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, HighlightText],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  // standalone: true
})
export class NavbarComponent {
  isLoggedIn: WritableSignal<boolean>;
  isSidebarOpen: WritableSignal<boolean>;

  constructor(private sidebarService: SidebarService,
    private loginService: LoginService,
    private signalService: SignalService,
    private router: Router) {
    this.isLoggedIn = this.signalService.isLoggedInSignal;
    this.isSidebarOpen = this.sidebarService.isOpend;
    // console.log(this.isLoggedIn())
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    this.loginService.logout();
  }

  login(): void{
    this.router.navigate(['/login']);
  }
}
