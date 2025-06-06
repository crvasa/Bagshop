import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'order-items-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css'
})
export class OrderItemsListComponent  implements OnInit{

  @Input()
  order!: Order;
  constructor(){}


  ngOnInit(): void {
  }
}
