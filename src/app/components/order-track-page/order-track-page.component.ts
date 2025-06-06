import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { OrderItemsListComponent } from "../order-items-list/order-items-list.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'order-track-page',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderItemsListComponent],
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => console.error('Errore nel caricamento ordini:', err)
    });
  }
}
