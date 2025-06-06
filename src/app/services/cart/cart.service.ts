import { Injectable, inject } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Bag } from '../../shared/models/bag';
import { CartItem } from '../../shared/models/CartItem';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(bag: Bag): void {
    let cartItem = this.cart.items.find(item => item.bag.id === bag.id);
    if (cartItem) {
      return;
    }
    this.cart.items.push(new CartItem(bag));
    this.setCartToLocalStorage();
  }

  removeFromCart(bagId: number): void {
    this.cart.items = this.cart.items.filter(item => item.bag.id !== bagId);
    this.setCartToLocalStorage();
  }

  changeQuantity(bagId: number, quantity: number): void {
    let cartItem = this.cart.items.find(item => item.bag.id === bagId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.bag.price;
    this.setCartToLocalStorage();
  }

  clearCart(): void {
    this.cart = new Cart();
    //this.setCartToLocalStorage();
    localStorage.removeItem('Cart');               // ✅ Rimuove dal localStorage
    this.cartSubject.next(this.cart); 
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cart.totalPrice = this.cart.items.reduce((sum, item) => sum + item.price, 0);
    this.cart.totalCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    if (!isPlatformBrowser(this.platformId)) return new Cart();

    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
