import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Cart } from '../Cart';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

totalPayment: number;
totalItems: number;
formData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<CheckoutComponent>,
  public productService: ProductService)

   { }

  ngOnInit() {
    
   this.totalItems = this.productService.getCartItemCount();
   this.totalPayment = this.productService.trolleyTotal();
  }

}
