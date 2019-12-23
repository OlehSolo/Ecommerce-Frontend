import { Product } from './Product';

export class Cart{
    product : Product
    count : number;

    constructor(product : Product, count : number){
      
        this.product = product;
        this.count = count;
    }


}