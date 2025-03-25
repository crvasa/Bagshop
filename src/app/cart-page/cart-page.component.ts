import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { BagService } from '../services/bag/bag.service';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
  cart!:Cart;
  constructor(private cartServices: CartService,
  ){
    this.setCart();
  }

  setCart(){
    this.cart = this.cartServices.getCart();
  }
  
  ngOnInit(): void {
    
  }

  removeFromCart(cartItem:CartItem){
    this.cartServices.removeFromCart(cartItem.bag.id);
    this.setCart();
  }


  changeQuantity(cartItem:CartItem, quantityInString: string){
    const quantity= parseInt(quantityInString);
    this.cartServices.changeQuantity(cartItem.bag.id, quantity);
    this.setCart();
  }
}
