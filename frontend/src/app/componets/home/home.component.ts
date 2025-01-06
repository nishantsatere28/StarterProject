import { Component , OnInit} from '@angular/core';
import { CurrentPageSignalService } from '../../ngrxSignal/currentPageSignal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private currentPageSignalService: CurrentPageSignalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentPageSignalService.setCurrentPage('home');
  }

  goToEmployees(): void {
    this.router.navigate(['/employees']);
  }
}
