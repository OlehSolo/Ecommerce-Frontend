import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

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
  constructor(private service: ProductService, 
    private router: Router,
    private dialog: MatDialog) { }

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
    total= total+(this.cartItems[i].quantity * this.price);
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
  this.cartItems.find(pr=>pr.productId==product.productId).quantity = product.quantity+1;
  this.service.addItemToTrolley(this.cartItems);
  this.trolleyTotal();
  console.log(product.quantity);
}

OnReduce(product){
  let total = 0;
  this.cartItems=this.service.getProductFromCart();
  this.cartItems.find(pr=>pr.productId==product.productId).quantity = product.quantity-1;
  this.service.addItemToTrolley(this.cartItems);
  this.trolleyTotal();
}
onCheckout()
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width ="80%";
  dialogConfig.data = {total: this.trolley, price:this.cartTotal};
   this.dialog.open(CheckoutComponent, dialogConfig);
}
}
