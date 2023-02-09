import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  faCartShopping = faCartShopping;
  faEye = faEye;
  @Input() gridList = false;
  @Input() product: ProductInterface = {
    id: '',
    price: 0,
    images: [''],
    title: '',
    category: {
      id: 0,
      name: '',
      image: '',
    },
    description: ''
  };

  @Output() showProductDetail = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<ProductInterface>();

  onShowProductDetail() {
    this.showProductDetail.emit(this.product.id);
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
