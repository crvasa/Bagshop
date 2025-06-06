import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  EventEmitter
} from '@angular/core';
import { Order } from '../../shared/models/Order';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent implements OnChanges {
  @Input() order!: Order;
  @Output() paymentCompleted = new EventEmitter<string>();

  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && this.order?.totalPrice) {
      this.initPaypalButton();
    }
  }

  private initPaypalButton() {
    const self = this;

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'CAD',
              value: self.order.totalPrice.toFixed(2),
            }
          }]
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;

        self.orderService.pay(this.order).subscribe({
          next: () => {
            this.cartService.clearCart();
            this.toastrService.success('Pagamento salvato con successo', 'Successo');
            this.paymentCompleted.emit(payment.id); // ✅ Notifica il componente padre
          },
          error: () => {
            this.toastrService.error('Pagamento fallito', 'Errore');
          }
        });
      },

      onError: (err: any) => {
        this.toastrService.error('Errore PayPal', 'Pagamento fallito');
        console.error('Errore PayPal:', err);
      }
    }).render(this.paypalElement.nativeElement);
  }
}
