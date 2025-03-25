import { Component, OnInit } from '@angular/core';
import { Bag } from '../shared/models/bag';
import { ActivatedRoute, Router } from '@angular/router';
import { BagService } from '../services/bag/bag.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-bag-page',
  standalone: false,
  templateUrl: './bag-page.component.html',
  styleUrl: './bag-page.component.css'
})
export class BagPageComponent implements OnInit{
  bag!: Bag;
tags: any;
  constructor(private activatedRoute: ActivatedRoute, 
    private bagService: BagService,
    private cartServices: CartService,
    private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.bag = this.bagService.getBagById(params['id'])!;
      }
    });
  }


  ngOnInit(): void {
    
  }

  addToCart(){
    this.cartServices.addToCart(this.bag);
    this.router.navigateByUrl('/cart-page');
  }
}
