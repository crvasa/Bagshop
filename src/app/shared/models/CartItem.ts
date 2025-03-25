import { Bag } from "./bag";

export class CartItem{
    constructor(bag: Bag){
        this.bag= bag;
        this.price;
    }
    bag:Bag;
    quantity: number = 1;

    get price():number{
        return this.bag.price * this.quantity;
    }
}
