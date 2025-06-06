import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { OrderItemsListComponent } from "../order-items-list/order-items-list.component";
import { PaypalButtonComponent } from "../paypal-button/paypal-button.component";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [OrderItemsListComponent, PaypalButtonComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  order: Order = new Order();

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        this.router.navigateByUrl('/checkout');
      }
    });
  }

  onPaymentCompleted() {
    this.router.navigateByUrl('/orders'); // ✅ Reindirizza qui dopo pagamento
  }
}
