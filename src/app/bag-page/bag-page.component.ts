import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Bag } from '../shared/models/bag';
import { BagService } from '../services/bag/bag.service';
import { CartService } from '../services/cart/cart.service';

import { NotFoundComponent } from '../not-found/not-found.component';
import { TagsComponent } from '../tags/tags.component';

@Component({
  standalone: true,
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundComponent,
]
})
export class BagPageComponent implements OnInit {
  bag!: Bag;
  tags: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bagService: BagService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        bagService.getBagById(params.id).subscribe(serverBag => {
          this.bag = serverBag;
        });
      }
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.bag);
    this.router.navigateByUrl('/cart-page');
  }
}
