import { Component, Input } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  faClose = faClose;

  totalCart = 0;
  shoppingCart: ProductInterface[] = [];
  // @Input() productId: string | null = null;
  @Input() set productId(id: string | null)  {
    if(id) {
      this.onShowProductDetail(id);
    }
  };
  @Input() isLoading = false;
  @Input() productList: ProductInterface[] = [];
  @Input() productListRandom: ProductInterface[] = [];
  @Input() showBanner = true;
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
          if (!this.isOpenSidebar) {
            this.isOpenSidebar = true;
          }
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
