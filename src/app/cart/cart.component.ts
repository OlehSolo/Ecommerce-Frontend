import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  trolley: number = 0;
  trolleyTotalPrice: number =  0;
  cartItems: Product[];
    cartTotal: number;
    price: number;
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.trolley = this.service.getCartItemCount();
    this.cartItems = this.service.getProductFromCart();
    this.cartTotal = this.trolleyTotal();
  }
  trolleyTotal()
 {
  let total=0;
  for (let i in this.cartItems) {
   this.price  = parseFloat(this.cartItems[i].productPrice);
    total= total+(this.cartItems[i].cartItemCount * this.price);
 }
 
 return this.cartTotal=total;
 }
 OnRemoveItem(id){
  for(var i = 0; i < this.cartItems.length; i++) {
    if(this.cartItems[i].productId == id) {
      this.cartItems.splice(i, 1);
      this.service.addItemToTrolley(this.cartItems);
      this.service.getProductFromCart();
      this.trolleyTotal();
      this.trolley = this.service.getCartItemCount();
      break;
    }
 }
}

OnIncrease(product){
  let total = 0;
  this.cartItems = this.service.getProductFromCart();
  this.cartItems.find(pr=>pr.productId==product.productId).cartItemCount = product.cartItemCount+1;
  this.service.addItemToTrolley(this.cartItems);
  this.trolleyTotal();
}

OnReduce(product){
  let total = 0;
  this.cartItems=this.service.getProductFromCart();
  this.cartItems.find(pr=>pr.productId==product.productId).cartItemCount = product.cartItemCount-1;
  this.service.addItemToTrolley(this.cartItems);
  this.trolleyTotal();
}

}
