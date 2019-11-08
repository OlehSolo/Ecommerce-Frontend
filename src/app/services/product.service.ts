import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  list: Product[];
  cartItems: Product[];
  total: number = 0;

  constructor(public formBuilder: FormBuilder, private http: HttpClient) { }

  readonly baseURI = 'http://localhost:8080/api/product';
  readonly uploadUri = 'http://localhost:8080/api';

  formModel = this.formBuilder.group({
    ProductID: [''],
    ProductName: [''],
    ProductCategory: [''],
    ProductPrice: [],
    ProductDescription: [''],
    ProductBarcode: [''],
    ProductBrand: [''],
    ProductPicture: ['']
   
  });

  insert(){

    var body = {
      productName: this.formModel.value.ProductName,
      productCategory: this.formModel.value.ProductCategory,
      productPrice: this.formModel.value.ProductPrice,
      productDescription: this.formModel.value.ProductDescription,
      productbarcode: this.formModel.value.ProductBarcode,
      productBrand: this.formModel.value.ProductBrand,
      
    };

    return this.http.post(this.baseURI + '/insert', body);
  }
imageUpload()
{

  var result = {
    productImage: this.formModel.value.ProductPicture

  }
  return this.http.post(this.uploadUri + '/picture/upload', result);
}
  listProducts(){
    this.http.get(this.baseURI + '/products')
      .toPromise().then(response => this.list = response as Product[]);
    }

    modifyProduct(){

      var product = {
        ProductId: this.formModel.value.ProductID,
        productName: this.formModel.value.ProductName,
        productCategory: this.formModel.value.ProductCategory,
        productPrice: this.formModel.value.ProductPrice,
        productDescription: this.formModel.value.ProductDescription,
        productbarcode: this.formModel.value.ProductBarcode,
        productBrand: this.formModel.value.ProductBrand,
        productImage: this.formModel.value.ProductPicture
      };
      return this.http.put(this.baseURI + '/modify/' + this.formModel.controls.ProductID.value, product);
    }

    remove(id: number){
      return this.http.delete(this.baseURI + '/remove/' + id);
    }
    removeAllProductsFromCart() {
      return localStorage.removeItem("product");
    }

    incrementItemCount(product)
  {
    product.cartItemCount++;
  }
  decrementItemCount(product)
  {
    if(product.cartItemCount < 1){
      product.cartItemCount = 1;
    }else{
      product.cartItemCount--;
    }
  }
  addItemToTrolley(product){
    localStorage.setItem('product', JSON.stringify(product));
  
  }
  removeItemFromCart(product){
   localStorage.removeItem(product);
  }
  getCartItemCount(){
    this.cartItems=this.getProductFromCart();
    this.total = this.cartItems.length;
    if(this.total != 0){
      return this.total;
    }
    else{
      return 0;
    }
  }
  getProductFromCart() {
    return JSON.parse(localStorage.getItem('product'));
  }

}
