
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations'; 
import { Component, OnInit, HostListener, Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  total: number = 0;
  cart: Product[];


  constructor(public service: ProductService, private router: Router
    ,@Inject(DOCUMENT) document) { }

  ngOnInit() {

    this.service.listProducts();
  }
  onCartDecrement(product){
    this.service.decrementItemCount(product);
    
   }
  onCartIncrement(product)
  {
   this.service.incrementItemCount(product);
  }
  onAddTrolley(product){
 this.cart = this.service.getProductFromCart();
   
   if(this.cart == null){
     this.cart = [];
    this.cart.push(product);
     this.service.addItemToTrolley(this.cart); 
   }
   else{
     let existingItem=this.cart.find(ep=>ep.productId==product.productId);
     if(existingItem == null){
       this.cart.push(product);
       this.service.addItemToTrolley(this.cart);
       
       
     }
     this.total = this.service.getCartItemCount();
   }
  }

}
