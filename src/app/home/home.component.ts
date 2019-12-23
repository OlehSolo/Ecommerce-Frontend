
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations'; 
import { Component, OnInit, HostListener, Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Orders } from 'src/Orders';
import { Cart } from '../Cart';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartorderService } from '../services/cartorder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  total: number = 0;
  cart: Product[];
  products: Product[] = [];
  orders : Orders[] = [];
  selectedProductOrder: Cart;
    private shoppingCartOrders: Orders;
    sub: Subscription;
    productSelected: boolean = false;


  constructor(public service: ProductService,private cartService: CartorderService, private router: Router
    ,@Inject(DOCUMENT) document) { }

  ngOnInit() {

    this.service.listProducts();
    this.total = this.service.getCartItemCount();
    console.log(this.service.getProductFromCart());
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
