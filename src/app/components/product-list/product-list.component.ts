import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  faClose = faClose;

  limit = 10;
  offset = 0;

  totalCart = 0;
  isLoading = false;
  shoppingCart: ProductInterface[] = [];
  productList: ProductInterface[] = [];
  productListRandom: ProductInterface[] = [];
  productDetail: ProductInterface = {
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

  isOpenSidebar: boolean = false;

  gridList = true;

  constructor(
    private productsService: ProductsService,
    private storeService: StoreService
  ) {
    this.shoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.productsService.getProductList(this.limit, this.offset)
        .pipe(
          tap((productList) => {
            for (let i = 0; i < 5; i++) {
              const random = Math.floor(Math.random() * ((this.limit + this.offset) - 1) + 1);
              this.productListRandom.push(productList[random]);
            }
          })
        )
        .subscribe((productList) => {
          this.productList = productList;
        });
    }, 3000);
    this.isLoading = false;
  }
  stopPropagation(event: Event) {
    event.stopPropagation()
  }


  toggleSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  onShowProductDetail(id: string) {
    this.productsService.getProductDetail(id)
      .subscribe({
        next: (product) => {
          this.productDetail = product;
          this.toggleSidebar();
        },
        error: (error) => console.log(error),
      });
  }

  onAddToCart(product: ProductInterface) {
    this.storeService.addProduct(product);
    this.totalCart = this.storeService.getTotalCart();
  }

  onChangeTypeList(value: boolean) {
    this.gridList = value;
  }
}
