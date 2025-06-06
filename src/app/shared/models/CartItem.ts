import { Bag } from "./bag";

export class CartItem {
    bag: Bag;
    quantity: number = 1;
    price: number;

    constructor(bag: Bag) {
        this.bag = bag;
        this.price = this.bag.price; // Ora `bag` è già inizializzato
    }
}
