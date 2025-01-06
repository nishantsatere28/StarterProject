import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-errorcomponet',
  imports: [],
  templateUrl: './errorcomponet.component.html',
  styleUrl: './errorcomponet.component.scss'
})
export class ErrorcomponetComponent {
  constructor(private router: Router) { }
  goBack(): void {
    this.router.navigate(['/home']);
  }
}
