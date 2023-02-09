import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private shoppingCart: ProductInterface[] = [];
  private myCart = new BehaviorSubject<ProductInterface[]>([]);

  myCart$ = this.myCart.asObservable();

  addProduct(product: ProductInterface) {
    this.shoppingCart.push(product);
    this.myCart.next(this.shoppingCart);
  }

  getTotalCart() {
    return this.shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart() {
    return this.shoppingCart;
  }
}
