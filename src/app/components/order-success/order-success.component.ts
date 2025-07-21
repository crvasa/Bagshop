import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent {

    constructor(
      private router: Router
    ) {}


  onCompletePurchase() {
  this.router.navigate(['/']);
  }
}
