import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Bag } from '../../shared/models/bag';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();


addToCart(bag:Bag):void{
  let cartItem =this.cart.items.find(item => item.bag.id === bag.id);
  if(cartItem){
    this.changeQuantity(bag.id, cartItem.quantity +1);
    return;
  }
  this.cart.items.push(new CartItem(bag));
}

removeFromCart(bagId: number):void{
  this.cart.items = 
  this.cart.items.filter(item => item.bag.id != bagId);
}


changeQuantity(bagId:number, quantity:number){
  let cartItem =this.cart.items.find(item => item.bag.id === bagId);
  if(!cartItem) return;
    cartItem.quantity = quantity;
}


getCart(): Cart{
  return this.cart;
}
}
