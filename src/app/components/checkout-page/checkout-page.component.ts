import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart/cart.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

import { Order } from '../../shared/models/Order';
import { TextInputComponent } from '../text-input/text-input.component';
import { OrderItemsListComponent } from '../order-items-list/order-items-list.component';
import { MapComponent } from '../map/map.component';

@Component({
  standalone: true,
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    OrderItemsListComponent,
    MapComponent
  ]
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  // Usando inject() è più sicuro in SSR
  private cartService = inject(CartService);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private toastrService = inject(ToastrService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;

    const { name, address } = this.userService.currentUser;

    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder(): void {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Inserisci Dati', 'Dati non validi');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning('Inserisci la tua posizione nella mappa', 'Posizione');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
  console.error('Errore ordine:', errorResponse);
  this.toastrService.error(
    errorResponse.error?.message || 'Errore generico',
    'Errore carrello'
  );
}

    });
  }
}
