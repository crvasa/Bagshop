import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import {
  ORDER_CREATE_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  ORDER_PAY_URL
} from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { ORDER_MY_URL } from '../shared/constants/urls';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const userJson = localStorage.getItem('User');
    const token = userJson ? JSON.parse(userJson).token : '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(ORDER_CREATE_URL, order, {
      headers: this.getAuthHeaders()
    });
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL, {
      headers: this.getAuthHeaders()
    });
  }

  pay(order: Order): Observable<string> {
    return this.http.post<string>(ORDER_PAY_URL, order, {
      headers: this.getAuthHeaders()
    });
  }

getMyOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(ORDER_MY_URL, {
    headers: this.getAuthHeaders()
  });
}
  getOrderById(id: string): Observable<Order> {
  return this.http.get<Order>(`/api/orders/track/${id}`, {
    headers: this.getAuthHeaders()
  });
}

}
