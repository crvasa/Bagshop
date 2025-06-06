import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { NotFoundComponent } from '../not-found/not-found.component';
import { DefaultButtonComponent } from "../components/default-button/default-button.component";

@Component({
  standalone: true,
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundComponent,
    DefaultButtonComponent
]
})
export class CartPageComponent implements OnInit {
  cart: Cart = new Cart();
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.bag.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString, 10);
    if (quantity > 0) {
      this.cartService.changeQuantity(cartItem.bag.id, quantity);
    } else {
      this.removeFromCart(cartItem);
    }
  }
}
