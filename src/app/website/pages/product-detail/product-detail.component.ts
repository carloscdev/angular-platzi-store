import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  faCartShopping = faCartShopping;
  faEye = faEye;

  productId: string | null = null;
  product: ProductInterface | null = null;
  currentImage = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
          this.productId = params.get('id');
          return this.productsService.getProductById(String(this.productId))
        })
      )
      .subscribe((product) => {
          this.product = product;
          this.currentImage = this.product.images[0];
      })
  }

  replaceImage(image: string) {
    this.currentImage = image;
  }
}
