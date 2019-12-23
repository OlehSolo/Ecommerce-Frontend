import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  readonly cartUri = 'http://localhost:8080/api/cart';

  saveCart(cart){
    return this.http.post(this.cartUri + '/additem', cart);
  }
}
