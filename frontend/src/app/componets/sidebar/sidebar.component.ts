import { Component, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../../ngrxSignal/siderbarSignal';
import { NavbarComponent } from '../navbar/navbar.component';
import { CurrentPageSignalService } from '../../ngrxSignal/currentPageSignal';
import { SignalService } from '../../ngrxSignal/auth.store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HighlightText } from '../../directives/HighlightText';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, MatSidenavModule, RouterOutlet, NavbarComponent, CommonModule,MatIconModule,HighlightText],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isSidebarOpened: WritableSignal<boolean>;
  currentPage: any;
  isLoggedin: WritableSignal<boolean>;

  constructor(
    private sidebarService: SidebarService,
    private currentPageSignalService: CurrentPageSignalService,
    private router: Router,
    private signalService: SignalService
  ) {
    this.isSidebarOpened = this.sidebarService.isOpend;
    this.currentPage = this.currentPageSignalService.currentPage;
    this.isLoggedin = this.signalService.isLoggedInSignal;
    console.log(this.isLoggedin());
  }

  setCurrentPage(page: string): void {
    this.router.navigate([page]);
  }

  get currentPageValue(): string {
    return this.currentPage();
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
