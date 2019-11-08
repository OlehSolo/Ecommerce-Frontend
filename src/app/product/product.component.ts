import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  total: number = 0;
  cart: Product[];

  constructor(public service: ProductService, public Toastr: ToastrService) { }

  ngOnInit() {
    document.getElementById("btn-update").style.visibility = "collapse";
    this.service.formModel.reset();
    this.service.listProducts();

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //this.service.formModel.get('ProductPicture').setValue(file);
    }
  }

  onAddProduct(){
    
    this.service.insert().subscribe(
      (response:any) => {
        if(response.success){
          this.service.formModel.reset();
          this.Toastr.success("Added New Product", "Success!")
        } 
      },
      err => {
        console.log(err);
      }
    );
    this.service.imageUpload().subscribe(
      (response: any) => {
        if(response.success){
          this.Toastr.success("Picture Uploaded", "Success!")
        } 
      }
    );
  }
  SaveChanges(id: number, product){
    this.service.modifyProduct().subscribe(c => {
      this.service.listProducts();
      this.Toastr.success("Changes are Saved", "Success!")
      
    });
    
  }
  OnEdit(product){
    document.getElementById('btn-submit').style.visibility = 'collapse';
    document.getElementById('btn-update').style.visibility = 'visible';
    this.service.formModel.controls.ProductID.setValue(product.productId)
    this.service.formModel.controls.ProductName.setValue(product.productName);
    this.service.formModel.controls.ProductCategory.setValue(product.productCategory);
    this.service.formModel.controls.ProductPrice.setValue(product.productPrice);
    this.service.formModel.controls.ProductBrand.setValue(product.productBrand);
    this.service.formModel.controls.ProductDescription.setValue(product.productDescription);
    this.service.formModel.controls.ProductBarcode.setValue(product.productbarcode);

  }

  OnRemove(id: number){
    console.log("product" + id)
   this.service.remove(id).subscribe(c => {
     this.service.listProducts();
     this.Toastr.success("Product is Removed", "Success!")
   });
  }
 

}
