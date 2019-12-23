import { Injectable } from '@angular/core';
import { Cart } from '../Cart';
import { Orders } from 'src/Orders';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartorderService {
  private ordersUrl = "http://localhost:8080/api/orders";

  private cart : Cart;
  private orders : Orders = new Orders();

  private productOrderSubject = new Subject();
  private ordersSubject = new Subject();
  private totalSubject = new Subject();

  private total: number;

  ProductOrderChanged = this.productOrderSubject.asObservable();
  OrdersChanged = this.ordersSubject.asObservable();
  TotalChanged = this.totalSubject.asObservable();

  constructor(private http: HttpClient) { }

  saveOrder(order: Orders) {
    return this.http.post(this.ordersUrl, order);
}
set SelectedProductOrder(value: Cart) {
  this.cart = value;
  this.productOrderSubject.next();
}
get SelectedProductOrder() {
  return this.cart;
}

set ProductOrders(value: Orders) {
  this.orders = value;
  this.ordersSubject.next();
}

get ProductOrders() {
  return this.orders;
}

get Total() {
  return this.total;
}

set Total(value: number) {
  this.total = value;
  this.totalSubject.next();
}
}
